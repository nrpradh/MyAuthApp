import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


import DatePicker from '../../../../components/datePicker';
import { ForEventMenu, ForProfile } from '../InsideGStyles'
import { PGStyling } from '../../PGStyling'


// Firestore Add Data
import { app,  db , getFirestore, collection, addDoc}  from '../../../../firebaseAPI';

const AddEvent = () => {
  const navigation = useNavigation(); 

  const [imageSource, setImageSource] = useState(null);
  const [eventName, setEventName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(""); 
  const [description, setDescription] = useState('');
  

  /* const intoFirestoreDB = async() => {
    try {
      const docRef = await addDoc(collection(db, "NewEvent"), {
        eventName: eventName,
        selectedDate: selectedDate,
        location: location,
        description: description,
        
      });
      
      console.log("Document written with ID: ", docRef.id);
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } */

  const handleEventName = (inputText) => { //Handle event Name
    setEventName(inputText);
  }

  const handleDateChange = (formattedDateTime) => {
    setSelectedDate(formattedDateTime); 
  
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

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 5],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const selectedImage = pickerResult.assets[0].uri;
      setImageSource(selectedImage);
      console.log('Image uploaded for box:', selectedImage);
    }
  };

  const handleConfirmAndSave = async () => {
    try {
      if (!imageSource|| !eventName || !selectedDate || !location || !description) {
        // If any of the fields are empty, display an alert to the user
        alert('Please fill in all fields.');
      } else {
        // If all fields are filled, save the data to Firestore
        const docRef = await addDoc(collection(db, "NewEvent"), {
          imageSource: imageSource,
          eventName: eventName,
          selectedDate: selectedDate,
          location: location,
          description: description,
        });
  
        console.log("Document written with ID: ", docRef.id);
  
        // Show an alert for confirmation
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
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  // Later on __________________________________________________________________
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
  // _______________________________________________________________________________
  return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
      
      <ScrollView 
        style={PGStyling.forContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.create}>Create Event</Text>

        <View style={ForEventMenu.theFrame}>
          <View style={ForEventMenu.addImageCont}>
            <TouchableOpacity onPress={selectImage}>
              {imageSource ? (
                <Image
                  source={{ uri: imageSource }}
                  style={ForEventMenu.image}
                  resizeMode="contain"
                />
              ) : (
                <Ionicons 
                  name="add-circle-outline" 
                  size={35} 
                  color="#f1f1f1" 
                />
              )}
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: 8 }}>
              <Text style={{ fontWeight: 'bold', color:'#f1f1f1' }}>
                {imageSource ? 'Tap again to edit ' : 'Add Image'}
              </Text>
              <Text style={{fontSize:14, color:'#ABABAB'}}>
                (poster, environment, etc.)
              </Text>
            </View>

          </View>
          <TxtInputs 
            label='Event Name' 
            placeholder='input the name'
            value={eventName}
            onChangeText={handleEventName}
            // onChangeText={(text) => handleEventName(text)}
          />
          
          <DatePicker onDateChange={handleDateChange} />
          
          <TxtInputs 
            label='Location' 
            placeholder='Input the location...'
            value={location}
            onChangeText={handleLocation}
            // onChangeText={(text) => handleLocation(text)}
          />
          
          
          <TxtInputs 
            label='Description' 
            placeholder='Input description (mention with @..)'
            value={description}
            onChangeText={handleDescription}
            // onChangeText={(text) => handleDescription(text)}
          />
          <Text style={ForEventMenu.addEventLabels}>Max Attendee :</Text>
        
          <TouchableOpacity onPress={handleConfirmAndSave}>
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
    color:'#353535',
    padding: 10,
    marginVertical:5,
    fontWeight:'500',
    // borderWidth:1,
    // borderColor:'#6155E5',
    // width: '95%',
    alignSelf: 'center',

  }

})