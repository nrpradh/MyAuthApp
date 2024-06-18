import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity, StatusBar, ToastAndroid,  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,  } from 'firebase/auth';
import { auth } from '../../firebaseAPI';
import { authGStyles } from './AuthGlobalStyling';
import TabNav from '../../navigations/TabNav';
import { Tab } from '@rneui/themed';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const user = auth.currentUser;

  if (user) {
    console.log("User is signed in.");
    // console.log("User UID:", user.uid);
  } else {
    console.log("No user signed in.");
  }

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'The email is probably badly formatted.';
      case 'auth/user-disabled':
        return 'This user account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  const LoggingIn = () => {
    if (!email || !password) {
      const message = 'Please fill in all fields.';
      setError(message);
      ToastAndroid.show(message, ToastAndroid.LONG);
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user.email);
        ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
        // navigation.navigate('TabNav');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage);
        ToastAndroid.show(`${errorMessage}`, ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.container}>
      
      <Text style={authGStyles.headingAuth}> Log In</Text>
      <Text style={authGStyles.subHeadingAuth}> Log into an existing account</Text>
      <View style={authGStyles.boxesAuth}>
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
        <View style={{width:'80%', alignSelf:'center', marginTop:20,}}>
          <TouchableOpacity onPress={LoggingIn}>
            <Text style={authGStyles.btnAuth}> Log in </Text>
          </TouchableOpacity>
        </View>

      </View>
      
      
     
      {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
      {/* <Text style={authGStyles.switchAuth}> Don't have an account? </Text> */}
    </View>
  );
}







export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#709065',
    margin:15
  },
  
  errorText: {
    textAlign:'center',
    color: '#902020',
    marginTop: 10,
  }
});
