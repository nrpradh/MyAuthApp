import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import firebase from 'firebase/compat/app';
import * as ImagePicker from 'expo-image-picker';
import { Feather} from '@expo/vector-icons';
import { getAuth, updateProfile, } from 'firebase/auth';
import { updateDoc, doc,db, getFirestore, query, where } from '../firebaseAPI';

import { ForEventMenu } from '../screens/AfterAuth/InsideMenus/InsideGStyles';

const RNModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);
  const [lastSelectedImage, setLastSelectedImage] = useState(null); 
  const [imageSource, setImageSource] = useState(null);

  const auth = getAuth();
  // const Firestore = getFirestore();

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
      setImageSource(selectedImage);

      
      console.log('Image uploaded for box:', selectedImage);
    }
  };

  

  //______________________ Update Username
  const [username, setUsername] = useState('');
  
  const data = {
    username: username
  }

  const handleUsernameChange = (text) => {
    setUsername(text)
  } 

  const updateUsername = async(email) => {
    const userRef = doc (db, 'userprofile', 'HKQyZkNsbLq7AfJmCkU4')
    updateDoc(userRef, data)
    .then(() => {
      console.log("New username :", username);
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
  

  //______________________ Update Org



  //______________________ Handle All Update
  


  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={ForEventMenu.addEventLabels}> Edit Profile </Text>

        
        <TouchableOpacity onPress={selectImage}>
          <Image source={{ uri: imageSource }} style={styles.image} />
        </TouchableOpacity>
        <Text style={{marginTop:5, color:'#ABABAB', fontSize:12}}> Tap to Edit </Text>
        
      </View>

      <TxtInputs 
        label='Username' 
        placeholder='Input new username..' 
        value={username}
        editable={!loading}
        onChangeText={handleUsernameChange}
      />

      <TxtInputs label='Organization' placeholder='Add or input new org..' />

      <View style={styles.buttonFlex}>
        
        <TouchableOpacity onPress={() => setVisibleModal(null)}>
          <View >
            <Text style={styles.buttonCancel}>Cancel</Text>
          </View>
        </TouchableOpacity>

      
        <TouchableOpacity onPress={updateUsername} disabled={loading}>
          <View >
            <Text style={styles.buttonSave}>Save</Text>
          </View>
        </TouchableOpacity>
        {loading && <ActivityIndicator color="#000" />} 
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>

      
    </View>
  );

  
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisibleModal(1)}>
            <Feather name="edit" size={20} color="#f1f1f1" marginLeft={60}/> 
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

  image: {
    // alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth:1, 
    borderColor:'#6155e5',
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
    color:'#6155e5',
    padding: 10, 
    margin: 10,
    textAlign: 'center',
    width:160, 
    fontSize:15,
    borderRadius: 5, 
  },

  buttonCancel:{
    backgroundColor: '#252525',
    color:'#6155e5',
    padding: 10, 
    margin: 10,
    textAlign: 'center',
    width:160, 
    fontSize:15,
    borderWidth:0.2,
    borderColor:'#6155e5',
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
    backgroundColor: 'rgba(25, 25, 25,1)',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default RNModal;
