import React from 'react';
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
      initialRouteName='TabsNavigation'>
        <Stack.Screen name='TabNavigation' component={TabNav}/>
         
    </Stack.Navigator>
  );
};

const Homestack = () => {
  
  return( 
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // Remove if you want the header bar visible
      }}>
      <Stack.Screen name='LandingPage' component={Landing} />
      <Stack.Screen name='HomePage' component={Home} /> 
      
    </Stack.Navigator>
  );
};


const EventMenuStack = () => {
  return (
    <View>
      <Stack.Screen name='EventMenuPage' component={EventMenu} /> 
    </View>
  )
}

const ProfileStack = () => {
  return (
    <View>
     <Stack.Screen name='ProfilePage' component={Profile} /> 
    </View>
  )
}





export {MainStack, Homestack, EventMenuStack, ProfileStack};