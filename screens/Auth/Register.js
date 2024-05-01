import { EmailAuthCredential } from 'firebase/auth/cordova';
import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { authGStyles } from './AuthGlobalStyling';




const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Registering  = () => {
    const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <View style={styles.container}>
      <Text style={authGStyles.headingAuth}> Sign Up</Text>
      <Text style={authGStyles.subHeadingAuth}> Create a new account </Text>
      <View style={authGStyles.boxesAuth}>
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
        <View style={{width:'80%', alignSelf:'center', marginTop:20,}}>
          <TouchableOpacity onPress={Registering}>
            <Text style={authGStyles.btnAuth}> Sign up </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* <Button title='Register' onPress={Registering} /> 
      <Text style={authGStyles.switchAuth}> Already have an account? </Text>*/}
    </View>
    )
  }

export default Register

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    // alignItems:'center',
    // backgroundColor:'#709065',
    margin:15
  },
  

})
