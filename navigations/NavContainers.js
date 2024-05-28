import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './Navigation';

import firebase from 'firebase/compat/app';

const NavContainers = () => {
  return (
    
      <NavigationContainer>
          <StatusBar
          backgroundColor="#321C43" // Change background color
          barStyle="light-content" // Change status bar icon color
          translucent={false} // Whether the status bar is translucent
        />
        <MainStack/>
      </NavigationContainer>
    
  )
}

export default NavContainers 
const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#709065',
  }

})

