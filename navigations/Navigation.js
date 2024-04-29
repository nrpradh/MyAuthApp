import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat/app';


// Page Stack
import Landing from '../screens/Auth/Landing';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import Home from '../screens/AfterAuth/Home';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    
    <Stack.Navigator 
      screenOptions={{
        headerShown: false, // Default header visibility for all screens
      }}
    >
        <Stack.Screen name='LandingPage' component={Landing} />
        <Stack.Screen name='RegisterPage' component={Register} />
        <Stack.Screen name='LoginPage' component={Login} />
        <Stack.Screen name='HomePage' component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigator;