import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat/app';


// TabNav imported
import TabNav from './TabNav';

// Page Stack
import Landing from '../screens/Auth/Landing';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';

// Main Screen
import Home from '../screens/AfterAuth/MainPages/Home';
import EventMenu from '../screens/AfterAuth/MainPages/EventMenu';
import Profile from '../screens/AfterAuth/MainPages/Profile';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    
    <Stack.Navigator 
      screenOptions= {{headerShown: false}}
      initialRouteName='LandingPage'>
        <Stack.Screen name='LandingPage' component={Landing} />
        <Stack.Screen name='TabNav' component={TabNav}/>
         
        
         
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  
  return( 
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove if you want the header bar visible
      }}>
      
      <Stack.Screen name='HomePage' component={Home} /> 
      
    </Stack.Navigator>
  );
};


const EventMenuStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove if you want the header bar visible
      }}>
      <Stack.Screen name='EventMenuPage' component={EventMenu} /> 
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove if you want the header bar visible
      }}>
      <Stack.Screen name='ProfilePage' component={Profile} /> 
    </Stack.Navigator>
  )
}





export {MainStack, HomeStack, EventMenuStack, ProfileStack};