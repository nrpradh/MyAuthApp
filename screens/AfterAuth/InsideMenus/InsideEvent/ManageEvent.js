import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, MaterialIcons,Ionicons } from '@expo/vector-icons';

import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent} from '../InsideGStyles' 


// Firestore Read Data
import { getDocs, collection, db } from '../../../../firebaseAPI';




const ManageEvent = () => {
  const [newEventList, setNewEventList]=useState([])

  const getNewEvent = async() => {
    const querySnapshot = await getDocs(collection(db, "NewEvent"));
    const events = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      events.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setNewEventList(events);
  };

  useEffect(() => {
    getNewEvent();
  }, []);

  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={PGStyling.forContainer}>
        <Text style={ForEventMenu.eventHeading}>Manage Event</Text>
        <View style={ForEventMenu.eventFlex}>
          <Text style={ForEventMenu.textGuide}> Manage your event by update, delete, etc.</Text>
          <View style={{flexDirection:'row'}}> 
            <Text style={ForEventMenu.textGuide}> Event Logs</Text>
            <Entypo name="chevron-thin-right" size={18} color="grey" />
          </View>
        </View>  
        
        {/* Manage Event Here */}
        <ScrollView 
          style={ForEventMenu.theFrame} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {newEventList.length > 0 ? (
            newEventList.map(item => (
              <TouchableOpacity key={item.id} onPress={() => console.log(`Event ${item.id} pressed`)}>
                <View style={ForManageEvent.imageContainer}> 
                  <View style={ForManageEvent.textContainer}>
                    <Text style={ForManageEvent.eventName}>{item.eventName}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="location-outline" size={16} color="lightgrey" />
                      <Text style={ForManageEvent.location}>{item.location}</Text>
                    </View>
                    <Text style={ForManageEvent.dTime}>{item.selectedDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No events available</Text>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default ManageEvent;

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    // backgroundColor:'rgba(244, 244, 244, 0.2)',
    // flexGrow: 1, // Added flexGrow to ensure proper scrolling
  },
  

})