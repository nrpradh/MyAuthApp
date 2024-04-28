import { StyleSheet, Text, View } from 'react-native'
import React, {Component} from 'react'

// Original auth
import OriginalAuth from './matterOne/originalAuth'

// Navigation
import NavContainers from './navigations/NavContainers'

// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "yours", 
  authDomain: "yours", 
  projectId: "yours", 
  storageBucket: "yours", 
  messagingSenderId: "yours", 
  appId: "yours", 
  measurementId: "yours" 
};

const app = initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);

export class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded) {
      return(
        <View style={{flex:1, justifyContent:'center'}}>  
          <Text> Loading...</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavContainers/>
  
  
      )

    }
    return(
      <View style={{flex:1, justifyContent:'center'}}>  
        <Text> User is logged in</Text>
      </View>
    )
    
  }
}



const styles = StyleSheet.create({
  
})
