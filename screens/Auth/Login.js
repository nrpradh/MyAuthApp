import { StyleSheet, TextInput, View, Button, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
      <TextInput
        placeholder='Email'
        style={styles.txtInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry={true}
        style={styles.txtInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title='Login' onPress={LoggingIn} />
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  },
  txtInput: {
    borderBottomWidth: 0.2,
    padding: 7,
    margin: 10,
  },
  errorText: {
    color: '#902020',
    marginTop: 10,
  }
});
