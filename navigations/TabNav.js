import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Import Navigation Stack Screens
import {HomeStack, EventMenuStack, ProfileStack } from './Navigation'



const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
    return (
      <Tab.Navigator
        shifting={true} // Enable it to shift animation for more than 3 tabs
        initialRouteName="HomePage"
        activeColor="#922090"
        inactiveColor="#b0bec5"
        barStyle={{ backgroundColor: '#f1f1f1', height:60 }}
      >
        <Tab.Screen
          name='Home'
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),  tabBarLabel: false,
          }}
        />
        <Tab.Screen
          name="Event"
          component={EventMenuStack}
          options={{
            tabBarLabel: 'EventMenuPage',
            tabBarIcon: ({ color }) => (
                <MaterialIcons name="event" size={24} color={color} />
            ), tabBarLabel: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarLabel: 'ProfilePage',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ), tabBarLabel: false,
          }}
        />
      </Tab.Navigator>
    );
  }
  

export default TabNav;