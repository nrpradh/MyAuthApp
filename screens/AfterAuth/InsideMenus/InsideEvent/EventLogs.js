import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';

import { PGStyling } from '../../PGStyling'
import { ForEventMenu} from '../InsideGStyles'

const EventLogs = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={PGStyling.forContainer}>
      <View style={styles.flexEndRow}>
        <Text style={ForEventMenu.eventHeading}>Event Logs</Text>
      </View>
      
        <View style={ForEventMenu.eventFlex}>
          <View style={{flexDirection:'row'}}>
            <Entypo name="chevron-thin-left" size={18} color="grey" />
            <Text style={ForEventMenu.textGuide}> Manage Event</Text>
          </View>  
          <View style={styles.flexEndRow}>
            <Text style={ForEventMenu.textGuide} > List of active, requested event, etc. </Text>
          </View>
        </View>
        
        
        <ScrollView style={ForEventMenu.theFrame}>
          <Text> CRUD </Text>
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default EventLogs

const styles = StyleSheet.create({
  flexEndRow:{
    justifyContent:'flex-end',
    flexDirection:'row'
  }
})