import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { PGStyling } from '../../PGStyling'
import { InsideGStyles } from '../InsideGStyles' 

const ManageEvent = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={InsideGStyles.screenLayout}>
      <View style={PGStyling.forContainer}>
        <Text>ManageEvent</Text>
      </View>
    </LinearGradient>
  )
}

export default ManageEvent

const styles = StyleSheet.create({})