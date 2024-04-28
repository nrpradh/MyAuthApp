import { EmailAuthCredential } from 'firebase/auth/cordova';
import React, { useState } from 'react'
import { View, StyleSheet, Text, Button, TextInput } from 'react-native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


// const firebaseConfig = {
//   apiKey: "AIzaSyAEB6pTlTj9_tjGWeWPvN5wxO6n6kaxcE8", 
//   authDomain: "inrush-authonly.firebaseapp.com", 
//   projectId: "inrush-authonly", 
//   storageBucket: "inrush-authonly.appspot.com", 
//   messagingSenderId: "479116863662", 
//   appId: "1:479116863662:web:308831712861f5cf26253f", 
//   measurementId: "G-GMC95BDDL7" 
// };


// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

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
    backgroundColor:'#709065',
  },
  txtInput: {
    borderBottomWidth:0.2,
    padding:7,
    margin:10,
  }

})
