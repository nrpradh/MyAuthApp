import React from 'react';
import {View, Text} from 'react-native';
import { Octicons, AntDesign, Feather, MaterialCommunityIcons  } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Homestack, Createstack, Profilestack} from './StackNavigation';



const Tabs = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator 
    screenOptions={{
      headerShown: false, // This disables the top bar for all screens
      tabBarShowLabel: false,
      tabBarStyle: { 
        borderTopWidth: 1, 
        borderColor: '#6155e5', 
        
      },

    }}>
      <Tabs.Screen name='Homepage' component={Homestack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
      
          tabBarActiveTintColor: '#f1f1f1',
          tabBarInactiveTintColor: '#6155e5',
          tabBarActiveBackgroundColor: '#6155e5',
          tabBarInactiveBackgroundColor: '#f1f1f1',
        }}/>
      <Tabs.Screen name='Create' component={Createstack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket-confirmation-outline" color={color} size={size} />
          ),
        
          tabBarActiveTintColor: '#f1f1f1',
          tabBarInactiveTintColor: '#6155e5',
          tabBarActiveBackgroundColor: '#6155e5',
          tabBarInactiveBackgroundColor: '#f1f1f1',
        }}/>
      <Tabs.Screen name='Profilepage' component={Profilestack}
       options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
      
          tabBarActiveTintColor: '#f1f1f1',
          tabBarInactiveTintColor: '#6155e5',
          tabBarActiveBackgroundColor: '#6155e5',
          tabBarInactiveBackgroundColor: '#f1f1f1',
        }} />
    </Tabs.Navigator>

    
  );
};

export default TabsNavigation;