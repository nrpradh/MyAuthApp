import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, Ionicons } from '@expo/vector-icons';

// import Global Style
import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent } from '../InsideGStyles'

// import Firestore
// import { query, where } from 'firebase/firestore';
import {collection, db, getDocs, query, where, orderBy } from '../../../../firebaseAPI'
import { getAuth } from 'firebase/auth';
import { EmailAuthCredential } from 'firebase/auth/cordova';

const ManageEvent = () => {
  const [newEventList, setNewEventList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const toCRUDevent = (event) => {
    navigation.navigate('CRUDeventPage', { event });
    
  };

  const getNewEvent = async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const newEventCollectionRef = collection(db, 'newevent');
      const newEventQuery = query(newEventCollectionRef, where('uid', '==', currentUser.uid));
    
      try {
        const querySnapshot = await getDocs(newEventQuery);
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({
           ...doc.data(),
            id: doc.id,
          });
        });
    
        const sortedEvents = events.sort((a, b) => b.createdAt - a.createdAt);
        setNewEventList(sortedEvents);
        setRefreshing(true);
      } catch (error) {
        console.error('Error fetching new events:', error);
      } finally {
        setRefreshing(false);
      }
    }
  };
  
  useEffect(() => {
    getNewEvent();
  }, []);
  
  const onRefresh = () => {
    getNewEvent();
  };
  

  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={ForManageEvent.forContainer}>
        <View style={ForEventMenu.eventFlex}>
          <Text style={ForEventMenu.textGuide}> Manage your event by update, delete, etc.</Text>
          
        </View>

        <ScrollView
          style={ForEventMenu.theFrame}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          
          {newEventList.length > 0 ? (
            newEventList.map(item => (
              <TouchableOpacity key={item.id} onPress={() => toCRUDevent(item)}>
              
                <View style={ForManageEvent.imageContainer}>
                  <Image source={{ uri: item.imageSource }} style={styles.image} />
                  <View style={ForManageEvent.textContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
                      <Text style={ForManageEvent.eventName}>{item.eventName}</Text>

                      <Text style={ForManageEvent.dTime}>{item.selectedDate}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:2 }}>
                      <Ionicons name="location-outline" size={14} color="#E4D4F1"  marginRight={4}/>
                      <Text style={ForManageEvent.location}>{item.location}</Text>
                    </View>
                    
                  </View>
                </View>
              </TouchableOpacity>
          
            ))
          ) : (
              <Text style={styles.noEvents}>No events available yet</Text>
          )}
          
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

// old ones
// <TouchableOpacity key={item.id} onPress={() => console.log(`Event ${item.id} pressed`)}>


export default ManageEvent;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, 
    // alignItems: 'center',
    // paddingBottom: 20,
  },
  noEvents: {
    fontSize:13,
    color:'#ABABAB',
    marginVertical:8,
    textAlign: 'center',
    
  },
  image: {
    alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 2,
    width: '100%', 
    height: 155,
  },  
});

