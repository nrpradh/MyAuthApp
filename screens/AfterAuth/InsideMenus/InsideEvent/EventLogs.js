import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';

import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent} from '../InsideGStyles'

const EventLogs = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      <View style={ForManageEvent.forContainer}>
      
      
      
        <View style={ForEventMenu.eventFlex}>  
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