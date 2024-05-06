import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import { ForEventMenu, ForProfile } from '../InsideGStyles';
import { PGStyling } from '../../PGStyling';


const EditProfile = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <Text style={ForProfile.editProfileTitle}>EditProfile</Text>
        <View style={ForProfile.proFrame}>
          <TxtInputs
            label='Username' 
            placeholder='Input new username..'  
          />
          <TxtInputs
            label='Organization' 
            placeholder='Add or input new org..'  
          />
          <TxtInputs
            label='Email' 
            placeholder='Input new email @..'  
          />
        </View>
      </View>
    </LinearGradient>
  )
}

const TxtInputs = ({placeholder,value, onChangeText, label}) => {
  

  return(
    <View>
      <Text style={ForEventMenu.addEventLabels}>{label}</Text>
      <TextInput
        // autoFocus={true}
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={ForEventMenu.inputBox}
        color='#f1f1f1'
        placeholderTextColor='#ABABAB'

      />

    </View>
  )

}
export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },
})