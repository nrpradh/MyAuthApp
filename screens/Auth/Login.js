import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native'
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

  const LoggingIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user.email);
        // navigation.navigate('TabNav');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={authGStyles.headingAuth}> Log In</Text>
      <Text style={authGStyles.subHeadingAuth}> Log into an existing account</Text>
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
          <TouchableOpacity onPress={LoggingIn}>
            <Text style={authGStyles.btnAuth}> Log in </Text>
          </TouchableOpacity>
        </View>

      </View>
      
      {/* 
      <Button title='Login' onPress={LoggingIn} /> 
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text style={authGStyles.switchAuth}> Don't have an account? </Text> */}
    </View>
  );
}



// const Login = () => {
//   const [user, setUser] = useState(null);

//   const onAuthStateSave = (user) => setUser(user);

//   useEffect(() => {
//     const subscriber = auth.onAuthStateChanged(onAuthStateSave);
//     return () => subscriber(); // Unsubscribe on component unmount
//   }, []); 

//   return (
//     <View style={{flex:1}}>  
//       <Text> you</Text>
//       {user ? <TabNav/> : <LoginPage/> } 
//     </View>
    
    
    
   
//   )
// }



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
    color: '#902020',
    marginTop: 10,
  }
});
