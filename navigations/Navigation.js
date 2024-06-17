import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

// Head Bar
import { doc, deleteDoc, db, collection, where, getDocs, query } from '../firebaseAPI';
import { useNavigation, useRoute } from '@react-navigation/native';

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
import SearchEvent from '../components/homeComps/searchDataBar';
import ThisMonthEvents from '../screens/AfterAuth/InsideMenus/InsideHome/ThisMonthEvents';

// EventMenu Stack w/ inside it
import EventMenu from '../screens/AfterAuth/MainPages/EventMenu';
import AddEvent from '../screens/AfterAuth/InsideMenus/InsideEvent/AddEvent';
import ManageEvent from '../screens/AfterAuth/InsideMenus/InsideEvent/ManageEvent';
import CRUDevent from '../screens/AfterAuth/InsideMenus/InsideEvent/CRUDevent';
import EventLogs from '../screens/AfterAuth/InsideMenus/InsideEvent/EventLogs';

// Profile Stack w/ inside it
import Profile from '../screens/AfterAuth/MainPages/Profile';
import EditProfileModal from '../components/profileComps/IconEditProfile'


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

const HomeStack = ({navigation}) => {
  const searchEvent = () => {
    navigation.navigate('SearchEventPanel');
  };
  const createEvent = () => {
    navigation.navigate('AddEventPage');
  };
  
  return( 
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible:false,
        headerShown: true, // Remove if you want the header bar visible
        gestureEnabled:true,
        headerStyle: {
          backgroundColor: '#321C75', // Set background color of the header
        },
        headerTitleStyle: {
          fontWeight: 500, // Set title font weight
        },
        headerTintColor: '#EADDF3', // Set color of back button and title
        headerTitleAlign: 'center',
      }}>
      
      <Stack.Screen 
        name='HomePage'
        component={Home} 
        options={{
          title : 'Home',
          headerStyle: {
            backgroundColor: '#321C75', // Set background color of the header
          },
          headerTintColor: '#EADDF3', // Set color of back button and title
          headerTitleAlign: 'center', // Center the header title

          headerRight: () => (
            <View style={{flexDirection:'row', alignItems:'center'}}> 
              <TouchableOpacity onPress={searchEvent} >
                <Ionicons name="search" size={24} color="#f1f1f1" marginRight={12} />
              
              </TouchableOpacity>
              <TouchableOpacity onPress={createEvent} >
                <Ionicons name="add" size={30} color="#f1f1f1" marginRight={15} />
              
              </TouchableOpacity>
            
            </View>
            
          )

        }}/> 
      <Stack.Screen name='Categories' component={Categories} /> 
      <Stack.Screen name='ViewEventPage' component={ViewEvent} options={{title : 'The Event'}}/>
      <Stack.Screen name='AddEventPage' component={AddEvent} options={{headerShown:false}}/>
      <Stack.Screen 
        name='SearchEventPanel' 
        component={SearchEvent}
        options={{
          title : 'Search Event', 
          headerShown:false, 
          presentation:'modal',
          gestureEnabled: true,
          
          // cardStyle: { backgroundColor: 'lightblue' },
          
          
        }}/>
        <Stack.Screen name='ThisMonthEventsPage' component={ThisMonthEvents} options={{title :' This Month'}}/>
    </Stack.Navigator>
  );
};


import { DeleteTheEvent } from '../screens/AfterAuth/InsideMenus/InsideEvent/CRUDevent';
import ThisMonthShortly from '../screens/AfterAuth/InsideMenus/InsideHome/ThisMonthEvents';

const EventMenuStack = () => {

  const navigation = useNavigation()


  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible:false,
        headerShown: false, // Remove if you want the header bar visible
        // gestureEnabled: true
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
            backgroundColor: '#321C75', // Set background color of the header
          },
          headerTintColor: '#EADDF3', // Set color of back button and title
          headerTitleAlign: 'center', // Center the header title

          headerRight: () => (  <DeleteTheEvent/>  ),
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
        headerShadowVisible:false,
        headerShown: true, // Remove if you want the header bar visible
        gestureEnabled:true,
        headerStyle: {
          backgroundColor: '#321C75', // Set background color of the header
        },
        headerTitleStyle: {
          fontWeight: 500, // Set title font weight
        },
        headerTintColor: '#EADDF3', // Set color of back button and title
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name='ProfilePage' component={Profile} options={{title:' Your Profile'}} /> 
      {/* <Stack.Screen name='EditProfileModal' component={EditProfileModal} /> */}
    </Stack.Navigator>
  )
}





export {MainStack, HomeStack, EventMenuStack, ProfileStack};