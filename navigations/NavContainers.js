import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation'

const NavContainers = () => {
  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  )
}

export default NavContainers

