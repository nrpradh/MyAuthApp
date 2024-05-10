import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile,  } from 'firebase/auth';
import {collection, addDoc, db, setDoc,doc} from '../../firebaseAPI'


import { authGStyles } from './AuthGlobalStyling';

const Register = () => {
  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleRegister = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid

      // // Update user profile with username
      // await updateProfile(user, {
      //   displayName: username,
      //   organization: organization

      // });

      // Add user data to Firestore collection
    const userProfileCollectionRef = collection(db, 'userprofile');
    // Reference to the document for the current user, using their UID as the document ID
    const userDocRef = doc(userProfileCollectionRef, uid);

    // Add user data to Firestore collection
    await setDoc(userDocRef, {
      uid: uid,
      email: user.email,
      username: username,
      organization: '' // Initialize organization to empty string
    });
      // const userData = {
      //   uid: user.uid,
      //   email: user.email,
      //   username: user.displayName,
      //   organization: ''
      // };
      
      // await setDoc(collection(db, 'userprofile'), userData);
      // await addDoc(collection(db, 'userprofile'), userData);
     


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
          placeholderTextColor='#f1f1f1'
          style={[authGStyles.inputAuth, { color: '#f1f1f1' }]}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder='Email'
          placeholderTextColor='#f1f1f1'
          style={[authGStyles.inputAuth, { color: '#f1f1f1' }]}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#f1f1f1'
          secureTextEntry={true}
          style={[authGStyles.inputAuth, { color: '#f1f1f1' }]}
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
