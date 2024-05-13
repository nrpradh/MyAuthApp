import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';


// TabNav imported
import TabNav from './TabNav';

// Page Stack
import Landing from '../screens/Auth/Landing';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';

// Main Screen w/ inside it
import Home from '../screens/AfterAuth/MainPages/Home';
import Categories from '../screens/AfterAuth/InsideMenus/InsideHome/Categories';

// EventMenu Stack w/ inside it
import EventMenu from '../screens/AfterAuth/MainPages/EventMenu';
import AddEvent from '../screens/AfterAuth/InsideMenus/InsideEvent/AddEvent';
import ManageEvent from '../screens/AfterAuth/InsideMenus/InsideEvent/ManageEvent';
import CRUDevent from '../screens/AfterAuth/InsideMenus/InsideEvent/CRUDevent';
import EventLogs from '../screens/AfterAuth/InsideMenus/InsideEvent/EventLogs';

// Profile Stack w/ inside it
import Profile from '../screens/AfterAuth/MainPages/Profile';
import EditProfileModal from '../components/IconEditProfile'


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
      <Stack.Screen name='Categories' component={Categories} /> 
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
      <Stack.Screen name='AddEventPage' component={AddEvent}/>
      <Stack.Screen name='ManageEventPage' component={ManageEvent}/>
      <Stack.Screen name='CRUDeventPage' component={CRUDevent} />  
      <Stack.Screen name='EventLogsPage' component={EventLogs}/>  

 

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
      <Stack.Screen name='EditProfileModal' component={EditProfileModal} />
    </Stack.Navigator>
  )
}





export {MainStack, HomeStack, EventMenuStack, ProfileStack};