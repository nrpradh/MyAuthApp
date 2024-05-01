import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { PGStyling } from '../../PGStyling'
import { InsideGStyles } from '../InsideGStyles'

const EventLogs = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={InsideGStyles.screenLayout}>
      <View style={PGStyling.forContainer}>
        <Text>EventLogs</Text>
      </View>
    </LinearGradient>
  )
}

export default EventLogs

const styles = StyleSheet.create({})