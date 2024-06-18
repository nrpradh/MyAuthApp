import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, Ionicons } from '@expo/vector-icons';

// import Global Style
import { PGStyling } from '../../PGStyling'
import { searchBarStyling } from '../InsideHome/homeGStyle';
import { ForEventMenu, ForManageEvent } from '../InsideGStyles'

// import Firestore
import {collection, db, getDocs, query, where, orderBy, onSnapshot } from '../../../../firebaseAPI'
import { getAuth } from 'firebase/auth';

const EventLogs = () => {
  const [eventLog, setEventLog] = useState([]);
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
        setEventLog(sortedEvents);
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
          <Text style={ForEventMenu.textGuide}> Your active and finished events.</Text>
          
        </View>

        <ScrollView
          style={ForEventMenu.theFrame}
          contentContainerStyle={{flexGrow: 1, }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          
          {eventLog.length > 0 ? (
            eventLog.map(item => (
              <TouchableOpacity key={item.id} >
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.imageSource }} style={styles.image} />
                  <Text style={{color:'#f1f1f1', fontWeight:'500', }}>{item.eventName}</Text>
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


export default EventLogs;

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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom:8,
    borderRadius:5,
    borderWidth: 0.6,
    borderColor: '#e4d4f1',
  },

  image: {
    // margin:5,
    width: 100,
    height: 50,
    marginRight: 12,
    borderRadius:3
  },  
});

