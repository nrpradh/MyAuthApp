import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Navigation Stack Screens
import {HomeStack, EventMenuStack, ProfileStack } from './Navigation'



const Tab = createMaterialBottomTabNavigator();

const TabNav = () => {
    return (
      <Tab.Navigator
        shifting={false} // Enable it shifting animation for more than 3 tabs
        initialRouteName="HomePage"
        activeColor="white"
        inactiveColor="#b0bec5"
        barStyle={{ backgroundColor: '#707070' }}
      >
        <Tab.Screen
          name="HomePage"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name=""
          component={EventMenuStack}
          options={{
            tabBarLabel: 'EventMenuPage',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarLabel: 'ProfilePage',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  

export default TabNav