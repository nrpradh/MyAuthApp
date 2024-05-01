import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import DatePicker from '../../../../components/datePicker';
import { ForEventMenu, ForProfile } from '../InsideGStyles'
import { PGStyling } from '../../PGStyling'


const AddEvent = () => {
  const navigation = useNavigation(); 

  const [eventName, setEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(""); 
  const [description, setDescription] = useState('');


  const handleEventName = (inputText) => { //Handle event Name
    setEventName(inputText);
  }

  const handleDateChange = (formattedDateTime) => {
    setSelectedDate(formattedDateTime); 
  
  };

  const openMaps = () => {
    const formattedAddress = location.replace(/\s/g, '+');
    let url;
  
    // Check the platform and generate the appropriate URL
    if (Platform.OS === 'android') {
      url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    } else if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/?q=${formattedAddress}`;
    } else {
      console.warn('Unsupported platform');
      return;
    }
  
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleAddressPress = () => {
    if (location) {
      openGoogleMaps();
    }
  };

  const handleLocation = (inputText) => {
    setLocation(inputText);
    // handleConfirm(); // Call handleConfirm to set the location and log the address
  };

  const openInstagramProfile = (username) => {
    const url = `https://www.instagram.com/${username}`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  const handleDescription = (inputText) => {
    // Parse the input text to identify Instagram usernames
    const segments = description.split(/\s+/);
    const parsedSegments = segments.map((segment, index) => {
      if (segment.startsWith('@')) {
        const username = segment.slice(1); // Remove '@' symbol
        return (
          <TouchableOpacity key={index} onPress={() => openInstagramProfile(username)}>
            <Text style={styles.link}>@{username}</Text>
          </TouchableOpacity>
        );
      } else {
        return segment;
      }
    });

    // setOutputText(parsedSegments);
    // Log the output text to the terminal
    // console.log('Output:', description);
    
    // Set the description state
    setDescription(inputText);
  };

  const handleConfirm = () => {
    if (!eventName || !selectedDate || !location || !description) {
      // If any of the fields are empty, display an alert to the user
      alert('Please fill in all fields.');
    } else {
      // If all fields are filled, show an alert for confirmation
      Alert.alert(
        'Confirmation',
        'Do you want to continue with the entered information?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('EventMenuPage');
              // Proceed to the next step or navigate to another page
              console.log('Event Name:', eventName);
              console.log('Date & Time:', selectedDate);
              console.log('Location:', location);
              console.log('Description:', description);
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      
      <ScrollView 
        style={PGStyling.forContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.create}>Create Event</Text>

        <View style={ForEventMenu.theFrame}>
          
          <TxtInputs 
            label='Event Name' 
            placeholder='input the name'
            value={eventName}
            onChangeText={handleEventName}
          />
          
          <DatePicker onDateChange={handleDateChange} />
          
          <TxtInputs 
            label='Location' 
            placeholder='Input the location...'
            value={location}
            onChangeText={handleLocation}
          />
          
          
          <TxtInputs 
            label='Description' 
            placeholder='Input description (mention with @..)'
            value={description}
            onChangeText={handleDescription}
          />
          <Text style={ForEventMenu.addEventLabels}>Max Attendee :</Text>
        
          <TouchableOpacity onPress={handleConfirm}>
            <Text style={styles.btnSubmit}>  Submit  </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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