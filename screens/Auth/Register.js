import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile,  } from 'firebase/auth';
import {collection, addDoc, db, setDoc,doc} from '../../firebaseAPI'


import { authGStyles } from './AuthGlobalStyling';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);;

  const auth = getAuth();
  const defaultPic = require('../../assets/toad-default-profilePic.png');

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email isnt good in format.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  
  const handleRegister = async () => {

    if (!email || !password || !username) {
      const message = 'Please fill in all fields.';
      setError(message);
      ToastAndroid.show(message, ToastAndroid.LONG);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid

     
      const userProfileCollectionRef = collection(db, 'userprofile');
      const userDocRef = doc(userProfileCollectionRef, uid);

      // Add user data to Firestore collection
      await setDoc(userDocRef, {
        uid: uid,
        email: user.email,
        username: username,
        organization: 'your-org', // Initialize organization to empty string
        profilePic: ''
      });



        console.log('New user registered successfully with username:', username);
        ToastAndroid.show('Registration successful!', ToastAndroid.SHORT);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage);
        ToastAndroid.show(`${errorMessage}`, ToastAndroid.LONG);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={authGStyles.headingAuth}> Sign Up</Text>
      <Text style={authGStyles.subHeadingAuth}> Create a new account </Text>
      <View style={authGStyles.boxesAuth}>
        <TextInput
          placeholder='Username'
          placeholderTextColor='rgba(234, 221, 243, 0.7)'
          style={[authGStyles.inputAuth, { color: '#eaddf3' }]}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder='Email'
          placeholderTextColor='rgba(234, 221, 243, 0.7)'
          style={[authGStyles.inputAuth, { color: '#EADDF3' }]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='rgba(234, 221, 243, 0.7)'
          secureTextEntry={true}
          style={[authGStyles.inputAuth, { color: '#EADDF3' }]}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={{ width: '80%', alignSelf: 'center', marginTop: 20, }}>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={authGStyles.btnAuth}> Sign up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 15
  },
});
