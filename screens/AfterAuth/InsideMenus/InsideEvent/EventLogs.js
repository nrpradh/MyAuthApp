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
        <View style={ForEventMenu.eventFlex}>
          <Entypo name="chevron-thin-left" size={18} color="grey" />
          <Text style={ForEventMenu.eventHeading}>Event Logs</Text>
        </View>
        <View style={{justifyContent:'flex-end', flexDirection:'row'}}>
          <Text style={ForEventMenu.textGuide} > List of event logs (active, requested, etc.) </Text>
        </View>
        <ScrollView style={ForEventMenu.theFrame}>
          
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default EventLogs

const styles = StyleSheet.create({})