import { EmailAuthCredential } from 'firebase/auth/cordova';
import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, TextInput } from 'react-native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';




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
      <TextInput
        placeholder='email'
        style={styles.txtInput}
        value={email}
        onChangeText={(text) => setEmail(text)}

      />
      <TextInput
        placeholder='password'
        secureTextEntry={true}
        style={styles.txtInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title='Register' onPress={Registering} />
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
  },
  txtInput: {
    borderBottomWidth:0.2,
    padding:7,
    margin:10,
  }

})
