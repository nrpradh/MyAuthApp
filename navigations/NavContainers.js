import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './Navigation';

import firebase from 'firebase/compat/app';

const NavContainers = () => {
  return (
    
      <NavigationContainer>
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

