import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert } from 'react-native'
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { ForEventMenu, ForProfile } from '../InsideGStyles'
import { PGStyling } from '../../PGStyling'
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddEvent = () => {
  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      
      <ScrollView 
        style={PGStyling.forContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.create}>Create Event</Text>

        <View style={ForEventMenu.theFrame}>
          
          <Text style={ForEventMenu.addEventLabels}> Event Name</Text>
          <TxtInputs/>
          <Text style={ForEventMenu.addEventLabels}> Date & Time</Text>
          <TxtInputs/>
          <Text style={ForEventMenu.addEventLabels}> Location</Text>
          <TxtInputs/>
          <Text style={ForEventMenu.addEventLabels}> Description</Text>
          <TxtInputs/>
          <Text style={ForEventMenu.addEventLabels}> Max Attendee : </Text>
          <TouchableOpacity>
            <Text style={styles.btnSubmit}>  Submit  </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const TxtInputs = () => {
  const [eventName, setEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [address, setAddress] = useState(""); // State for input address
  const [location, setLocation] = useState(""); // State for location
  const [description, setDescription] = useState('');
  return(
    <View>
      <TextInput
        // autoFocus={true}
        multiline
        placeholder='Input...'
        style={styles.inputBox}
        color='#f1f1f1'
        placeholderTextColor='#ABABAB'
      />

    </View>
  )

}

export default AddEvent

const styles = StyleSheet.create({
  create:{
    color:'#353535',
    textAlign:'center',
    fontSize:18,
    fontWeight:'500',
    marginHorizontal:4,
    // marginTop:40
  },
  inputBox: {
    backgroundColor: '#353535',
    borderRadius: 5,
    borderColor: '#6155e5',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 2,
    marginBottom:15,
  },
  btnSubmit:{
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    color:'#6155e5',
    padding: 10,
    marginVertical:5,
    fontWeight:'500',
    // borderWidth:1,
    // borderColor:'#6155E5',
    // width: '95%',
    alignSelf: 'center',

  }

})