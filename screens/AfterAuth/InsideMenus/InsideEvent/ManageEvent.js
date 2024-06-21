import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, Ionicons } from '@expo/vector-icons';

// import Global Style
import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent } from '../InsideGStyles'

// import Firestore
import {collection, db, getDocs, query, where, orderBy, onSnapshot } from '../../../../firebaseAPI'
import { getAuth } from 'firebase/auth';

const ManageEvent = () => {
  const [newEventList, setNewEventList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const toCRUDevent = (event) => {
    navigation.navigate('CRUDeventPage', { event });
    
  };

  const getEvents = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const newEventCollectionRef = collection(db, 'newevent');
      const newEventQuery = query(newEventCollectionRef, where('uid', '==', currentUser.uid));

      const unsubscribe = onSnapshot(newEventQuery, (querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({
          ...doc.data(),
            id: doc.id,
          });
        });
        const sortedEvents = events.sort((a, b) => b.createdAt - a.createdAt);
        setNewEventList(sortedEvents);
      });

      return unsubscribe;
    }
  };

  useEffect(() => {
    const unsubscribe = getEvents();
    return unsubscribe;
  }, []);

  const onRefresh = () => {
    getEvents();
  };
  

  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={ForManageEvent.forContainer}>
        <View style={ForEventMenu.eventFlex}>
          <Text style={ForEventMenu.textGuide}> Manage your event by update, delete, etc.</Text>
          
        </View>

        <ScrollView
          style={ForEventMenu.theFrame}
          contentContainerStyle={{flexGrow: 1, }}
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
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEvents}>-- No events available yet --</Text>
            </View>
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
  noEventsContainer:{
    justifyContent:'center', 
    alignItems:'center', 
    flex:1,
  },

  noEvents : {
    color:'rgba(234, 221, 243, 0.4)',
    fontSize:12,
  },

  image: {
    alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 2,
    width: '100%', 
    height: 125,
  },  
});

