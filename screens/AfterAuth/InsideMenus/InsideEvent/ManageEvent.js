import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';

import { PGStyling } from '../../PGStyling'
import { ForEventMenu} from '../InsideGStyles' 

const ManageEvent = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={PGStyling.forContainer}>
        <View style={ForEventMenu.eventFlex}>
          <Text style={ForEventMenu.eventHeading}>Manage Event</Text>
          <Entypo name="chevron-thin-right" size={18} color="grey" />
          
        </View>  
        
          <Text style={ForEventMenu.textGuide}> Manage your event by update, delete, etc.</Text>
    
        <ScrollView style={ForEventMenu.theFrame}>
         
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default ManageEvent

const styles = StyleSheet.create({
  

})