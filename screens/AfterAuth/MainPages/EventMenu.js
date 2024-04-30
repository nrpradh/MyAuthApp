import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { PGStyling } from '../PGStyling';

const EventMenu = () => {
  return (
    <LinearGradient
      colors={['#f1f1f1', '#6155e5', '#353535']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}  
      style={styles.container}
    >
      <View style={PGStyling.forContainer}>
        <Text>EventMenu</Text>
      </View>
    </LinearGradient>
  )
}

export default EventMenu

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  }
})