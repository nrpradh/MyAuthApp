import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Head Bar
import { doc, deleteDoc, db, collection, where, getDocs, query } from '../firebaseAPI';
import { useNavigation } from '@react-navigation/native';

// TabNav imported
import TabNav from './TabNav';

// Page Stack
import Landing from '../screens/Auth/Landing';
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';

// Main Screen w/ inside it
import Home from '../screens/AfterAuth/MainPages/Home';
import Categories from '../screens/AfterAuth/InsideMenus/InsideHome/Categories';
import ViewEvent from '../screens/AfterAuth/InsideMenus/InsideHome/ViewEvent';

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
        headerShown: true, // Remove if you want the header bar visible
        gestureEnabled:true,
        headerStyle: {
          backgroundColor: '#f1f1f1', // Set background color of the header
        },
        headerTitleStyle: {
          fontWeight: 500, // Set title font weight
        },
        headerTintColor: '#353535', // Set color of back button and title
        headerTitleAlign: 'center',
      }}>
      
      <Stack.Screen name='HomePage'  component={Home} options={{title : 'Home'}}/> 
      <Stack.Screen name='Categories' component={Categories} /> 
      <Stack.Screen name='ViewEventPage' component={ViewEvent} options={{title : 'View Event'}}/>
    </Stack.Navigator>
  );
};


const EventMenuStack = () => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.navigate('EventMenuPage');
  };

  

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove if you want the header bar visible
        gestureEnabled: true
      }}>
      <Stack.Screen name='EventMenuPage' component={EventMenu} />
      <Stack.Screen name='AddEventPage' component={AddEvent}/>
      <Stack.Screen name='ManageEventPage' component={ManageEvent}/>

      <Stack.Screen
        name="CRUDeventPage"
        component={CRUDevent}
        options={{
          title: '  Edit Event',
          headerShown:true,
          headerStyle: {
            backgroundColor: '#f1f1f1', // Set background color of the header
          },
          headerTintColor: '#353535', // Set color of back button and title
          headerTitleAlign: 'center', // Center the header title
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={handleGoBack}
            >
              <Ionicons name="arrow-back" size={24} color="#353535" />
            </TouchableOpacity>
          ),
         
        }}
      />

      
      <Stack.Screen name='EventLogsPage' component={EventLogs}/>  

 

    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // Remove if you want the header bar visible
        gestureEnabled:true,
        headerStyle: {
          backgroundColor: '#f1f1f1', // Set background color of the header
        },
        headerTitleStyle: {
          fontWeight: 500, // Set title font weight
        },
        headerTintColor: '#353535', // Set color of back button and title
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name='ProfilePage' component={Profile} options={{title:' Your Profile'}} /> 
      <Stack.Screen name='EditProfileModal' component={EditProfileModal} />
    </Stack.Navigator>
  )
}





export {MainStack, HomeStack, EventMenuStack, ProfileStack};