import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { PGStyling } from '../../PGStyling'

const AddEvent = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient}>
      <View style={PGStyling.forContainer}>
        <Text>AddEvent</Text>
      </View>
    </LinearGradient>
  )
}

export default AddEvent

const styles = StyleSheet.create({})