import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase/compat/app';
import * as ImagePicker from 'expo-image-picker';
import { Feather} from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

import {updateDoc, doc,db, getDoc,  collection, } from '../firebaseAPI';


import { ForEventMenu } from '../screens/AfterAuth/InsideMenus/InsideGStyles';



const IconEditProfile = ({userData}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);
  
  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    // Set the values from params to the state variables
    setUsername(userData.username);
    setOrganization(userData.organization);
    setProfilePic(userData.profilePic);
  }, [userData.username, userData.organization, userData.profilePic]);

  const auth = getAuth();
  
  const handleUpdate = async () => {
    try {
      // Get the current user
      const user = auth.currentUser;
      
      if (user) {
        // Reference to the user's document in the 'userprofile' collection
        const userProfileCollectionRef = collection(db, 'userprofile');
        const userDocRef = doc(userProfileCollectionRef, user.uid);

        // Get the current user profile data
        const userData = (await getDoc(userDocRef)).data();

        // Update user data in Firestore
        await updateDoc(userDocRef, {
          // Update specific fields
          username: username ,
          organization: organization ,
          profilePic: profilePic 
        });

        console.log('User data updated successfully : ',  username, organization, profilePic);
        setVisibleModal(null);
      } else {
        console.error('No user is currently signed in');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  

  //________________________ Update User Photo
  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const selectedImage = pickerResult.assets[0].uri;
      setProfilePic(selectedImage);
      console.log('Image uploaded for profile:', selectedImage);
    }
  };

 
  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={ForEventMenu.addEventLabels}> Edit Profile </Text>

        
        <TouchableOpacity onPress={selectImage}>
          <Image source={{ uri: profilePic }} style={styles.image} />
        </TouchableOpacity>
        <Text style={{marginTop:5, color:'#ABABAB', fontSize:12}}> Tap to Edit </Text>
        
      </View>

      <TxtInputs 
        label='Username' 
        placeholder='Update username...'
        value={username}
        editable={loading}
        onChangeText={text => setUsername(text)}
      />

      <TxtInputs 
        label='Organization' 
        placeholder='Update org...' 
        value={organization}
        editable={loading}
        onChangeText={text => setOrganization(text)}
      />

      <Text style={{
        color:'rgba(234, 221, 243, 0.7)',
        fontSize:9,
        alignSelf:'center'
      }}
      >* Update at least one data  </Text>
      <View style={styles.buttonFlex}>
        
        <TouchableOpacity onPress={() => setVisibleModal(null)}>
          <View >
            <Text style={styles.buttonCancel}>Cancel</Text>
          </View>
        </TouchableOpacity>

      
        <TouchableOpacity onPress={handleUpdate} disabled={loading}>
          <View >
            <Text style={styles.buttonSave}>Save</Text>
          </View>
        </TouchableOpacity>
        {loading && <ActivityIndicator color="#EADDF3" />} 
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
      
      
    </View>
  );

  
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisibleModal(1)}>
            <Feather 
              name="edit" 
              size={20} 
              color="#f1f1f1"
              style={styles.iconEdit}
              /> 
        </TouchableOpacity>
        
        <Modal
          isVisible={visibleModal === 1}
          style={styles.bottomModal}
        >
          {renderModalContent()}
        </Modal>
    </View>
  );
}

const TxtInputs = ({ placeholder, value, onChangeText, label }) => {
  return (
    <View>
      <Text style={styles.editLabels}>{label}</Text>
      <TextInput
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={ForEventMenu.inputBox}
        color='#f1f1f1'
        placeholderTextColor='#ABABAB'
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },
  iconEdit:{
    // backgroundColor:'red',
    position:'absolute',
    left:60,
    // top:0,
    bottom:5,
  },

  image: {
    // alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth:1, 
    borderColor:'#EADDF3',
    width: 85, 
    height: 85,
  },  
  buttonFlex:{
    flexDirection:'row',
    justifyContent:'center',
    paddingHorizontal:10,
    marginVertical:10,
  },


  buttonSave: {
    backgroundColor: '#f1f1f1',
    color:'#321c43',
    padding: 10, 
    margin: 10,
    textAlign: 'center',
    width:160, 
    fontSize:15,
    fontWeight:'500',
    borderRadius: 5, 
  },

  buttonCancel:{
    backgroundColor: '#321c43',
    color:'rgba(234, 221, 243, 0.7)',
    padding: 10, 
    margin: 10,
    textAlign: 'center',
    width:160, 
    fontSize:15,
    borderWidth:0.4,
    borderColor:'rgba(234, 221, 243, 0.7)',
    borderRadius: 5, 
  },
  editLabels:{
    color:'#f1f1f1',
    fontSize:13,
    fontWeight:'500',
    marginLeft:5,
    marginVertical:10,
  },

  modalContent: {
    backgroundColor: 'rgba(50, 28, 67,0.5)',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default IconEditProfile;
