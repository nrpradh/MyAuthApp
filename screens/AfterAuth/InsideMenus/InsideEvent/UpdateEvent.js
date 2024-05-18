import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity  } from 'react-native'
import React,{useState} from 'react'

import { ForEventMenu } from '../InsideGStyles'

const UpdateEvent = () => {

    return (
        <View>
        <Text>UpdateEvent</Text>
        </View>
    )
}

export default UpdateEvent

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

const styles = StyleSheet.create({})