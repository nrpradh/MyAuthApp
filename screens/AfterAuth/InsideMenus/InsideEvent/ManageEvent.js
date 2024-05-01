import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo, MaterialIcons,Ionicons } from '@expo/vector-icons';


import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent} from '../InsideGStyles' 

const ManageEvent = () => {
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
          // contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          >
            
          <Text> Manage </Text>

          <TouchableOpacity onPress={() => console.log(`Image ${item.id} pressed`)}>
             <View style={ForManageEvent.imageContainer}> 
              {/*<Image source={item.source} style={styles.image} /> */}
              <View style={ForManageEvent.textContainer}>
                <Text style={ForManageEvent.eventName}> Hello </Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Ionicons name="location-outline" size={16} color="lightgrey" />
                  <Text style={ForManageEvent.location}> Location</Text>
                </View>
                <Text style={ForManageEvent.dTime}> Date&Time</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default ManageEvent

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    // backgroundColor:'rgba(244, 244, 244, 0.2)',
    // flexGrow: 1, // Added flexGrow to ensure proper scrolling
  },
  

})