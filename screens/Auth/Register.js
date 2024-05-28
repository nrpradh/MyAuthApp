import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile,  } from 'firebase/auth';
import {collection, addDoc, db, setDoc,doc} from '../../firebaseAPI'


import { authGStyles } from './AuthGlobalStyling';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleRegister = async () => {
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
      organization: '', // Initialize organization to empty string
      profilePic:''
    });



      console.log('New user registered successfully with username:', username);
    } catch (error) {
      console.error('Error registering user:', error);
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
