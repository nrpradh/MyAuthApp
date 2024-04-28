import { StyleSheet, TextInput, View, Button } from 'react-native'
import React, {useState} from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoggingIn  = () => {
    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          const user = userCredential.user;
          console.log(user.email)
          navigation.navigate('HomePage');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
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
      <Button title='Login' onPress={LoggingIn} />
    </View>
  )
}

export default Login

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