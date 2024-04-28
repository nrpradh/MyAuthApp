import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Original auth
import OriginalAuth from './matterOne/originalAuth'

// Navigation
import NavContainers from './navigations/NavContainers'
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAEB6pTlTj9_tjGWeWPvN5wxO6n6kaxcE8", 
  authDomain: "inrush-authonly.firebaseapp.com", 
  projectId: "inrush-authonly", 
  storageBucket: "inrush-authonly.appspot.com", 
  messagingSenderId: "479116863662", 
  appId: "1:479116863662:web:308831712861f5cf26253f", 
  measurementId: "G-GMC95BDDL7" 
};

const app = initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
const App = () => {
  return (
     
     <NavContainers/>
    
  )
}

export default App

const styles = StyleSheet.create({
  
})