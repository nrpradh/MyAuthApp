import { StyleSheet, Text, View } from 'react-native'
import React, {Component} from 'react'

// Original auth
import OriginalAuth from './matterOne/originalAuth'

// Navigation
import NavContainers from './navigations/NavContainers'

// import * as firebase from 'firebase';





// const app = initializeApp(firebaseConfig);



const App = () => {
  return (
   <NavContainers/>
  )
}

export default App

const styles = StyleSheet.create({})