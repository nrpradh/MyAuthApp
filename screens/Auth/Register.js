import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authGStyles } from './AuthGlobalStyling';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Registering = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // Update user profile with username
        updateProfile(auth.currentUser, { displayName: username })
          .then(() => {
            // Profile updated successfully
            console.log('Username added:', username);
          })
          .catch((error) => {
            // An error occurred while updating profile
            console.error('Error updating profile:', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle error
      });
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
          <TouchableOpacity onPress={Registering}>
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
