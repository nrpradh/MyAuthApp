import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, Ionicons } from '@expo/vector-icons';

import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent } from '../InsideGStyles'
import { getDocs, collection, db } from '../../../../firebaseAPI';

const ManageEvent = () => {
  const [newEventList, setNewEventList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNewEvent = async () => {
    setRefreshing(true);
    const querySnapshot = await getDocs(collection(db, "NewEvent"));
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setNewEventList(events);
    setRefreshing(false);
  };

  useEffect(() => {
    getNewEvent();
  }, []);

  const onRefresh = () => {
    getNewEvent();
  };

  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={PGStyling.forContainer}>
        <Text style={ForEventMenu.eventHeading}>Manage Event</Text>
        <View style={ForEventMenu.eventFlex}>
          <Text style={ForEventMenu.textGuide}> Manage your event by update, delete, etc.</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={ForEventMenu.textGuide}> Event Logs</Text>
            <Entypo name="chevron-thin-right" size={18} color="grey" />
          </View>
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
              <TouchableOpacity key={item.id} onPress={() => console.log(`Event ${item.id} pressed`)}>
                <View style={ForManageEvent.imageContainer}>
                  <Image source={{ uri: item.imageSource }} style={styles.image} />
                  <View style={ForManageEvent.textContainer}>
                    <Text style={ForManageEvent.eventName}>{item.eventName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="location-outline" size={16} color="lightgrey" />
                      <Text style={ForManageEvent.location}>{item.location}</Text>
                    </View>
                    <Text style={ForManageEvent.dTime}>{item.selectedDate}</Text>
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
    resizeMode: 'cover',
    borderRadius: 3,
    width: '100%', 
    height: 140,
},
});

