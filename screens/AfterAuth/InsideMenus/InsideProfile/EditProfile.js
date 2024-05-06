import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../../PGStyling';


const EditProfile = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <Text style={PGStyling.pageTitle}>EditProfile</Text>
      </View>
    </LinearGradient>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },
})