import React, {useState} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { SpeedDial } from '@rneui/themed';


import ManageEvent from '../InsideMenus/InsideEvent/ManageEvent';
import EventLogs from '../InsideMenus/InsideEvent/EventLogs';





const EventMenu = () => {
  
  return(
    <View style={{flex:1}}>
      <TopTabNav/>
      <ToAddEvent/>
    </View>
  )

}

const ToAddEvent = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('AddEventPage');
    setOpen(false);
  };
  return(
    <SpeedDial 
      isOpen={open}
      icon={{ name: 'add', color: '#353535' }}
      openIcon={{ name: 'close', color: '#353535' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      buttonStyle={{backgroundColor:'#f1f1f1'}} 
      containerStyle={{ borderWidth: 0.5, borderColor: '#353535' }}
    >
      <SpeedDial.Action
        icon={{ name: 'upload', color: '#353535' }}
        buttonStyle={{backgroundColor:'#f1f1f1', }}
        title="Create & upload"
        titleStyle={{ color: '#353535' }}
        containerStyle={{ borderWidth: 0.5, borderColor: '#353535' }}
        onPress={handleNavigation} // Call the handleNavigation function
      />
    </SpeedDial>
  )

}


const Tab = createMaterialTopTabNavigator();

const TopTabNav = () => {
  return (
    <Tab.Navigator 
      initialRouteName='Manage'
      screenOptions={{
        tabBarActiveTintColor: '#353535', // Color of the active tab text
        tabBarInactiveTintColor: '#ABABAB', // Color of the inactive tab text
        tabBarLabelStyle: {
          fontSize: 15, // Font size of the tab labels
          fontWeight: 500, // Font weight of the tab labels
        },
        tabBarStyle: {
          backgroundColor: '#f1f1f1', // Background color of the tab bar
          paddingTop:40,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#353535', // Color of the tab indicator
        },
        tabBarPressColor:'#f5f5f5', // Disable touch effect color
        tabBarPressOpacity: 0,
      }}>
      <Tab.Screen 
        name="Manage" 
        component={ManageEvent} 
        options={{tabBarLabel:' Manage Event'}}
      />
      <Tab.Screen 
        name="Logs" 
        component={EventLogs} 
        options={{tabBarLabel:' Event Logs'}}  
      />
    </Tab.Navigator>
      
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})

export default EventMenu;
