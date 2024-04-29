import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { authGStyles } from './AuthGlobalStyling';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const LoggingIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user.email);
        // Navigate to 'HomePage' after successful login
        navigation.navigate('HomePage');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
        // Set error state to display error message
        setError(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={authGStyles.titleAuth}> Log into an existing account</Text>
        <View style={authGStyles.boxesAuth}>
        <TextInput
          placeholder='Email'
          placeholderTextColor='#f1f1f1'
          style={authGStyles.inputAuth}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          placeholderTextColor='#f1f1f1'
          secureTextEntry={true}
          style={authGStyles.inputAuth}
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

export default Login;

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
