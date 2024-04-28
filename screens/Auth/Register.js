import { EmailAuthCredential } from 'firebase/auth/cordova';
import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


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

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email:'',
      password:'',
      name:'',
    }
    this.onSignUp =this.onSignUp.bind(this)
  }
  onSignUp(){
    const {email, password, name} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'#f1f1f1', padding:10, margin:5, }}>
          <TextInput
            placeholder='Username'
            style={styles.txtInput}
            onChangeText={(name) => this.setState({name})}

          />
          <TextInput
            placeholder='email'
            style={styles.txtInput}
            onChangeText={(email) => this.setState({email})}

          />
          <TextInput
            placeholder='password'
            secureTextEntry={true}
            style={styles.txtInput}
            onChangeText={(password) => this.setState({password})}

          />
          </View>
        <Button 
          title='register'
          onPress={this.onSignUp}
        />

      </View>
    )
  }
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
