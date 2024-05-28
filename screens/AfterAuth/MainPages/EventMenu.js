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
      icon={{ name: 'add', color: '#321C43' }}
      openIcon={{ name: 'close', color: '#321C43' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      buttonStyle={{backgroundColor:'#f1f1f1'}} 
      containerStyle={{ borderWidth: 0.5, borderColor: '#321C43' }}
    >
      <SpeedDial.Action
        icon={{ name: 'upload', color: '#321C43' }}
        buttonStyle={{backgroundColor:'#f1f1f1', }}
        title="Create & upload"
        titleStyle={{ color: '#321C43' }}
        containerStyle={{ borderWidth: 0.5, borderColor: '#321C43' }}
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
        tabBarActiveTintColor: '#EADDF3', // Color of the active tab text
        tabBarInactiveTintColor: 'rgba(234, 221, 243, 0.4)', // Color of the inactive tab text
        tabBarLabelStyle: {
          fontSize: 15, // Font size of the tab labels
          fontWeight: 500, // Font weight of the tab labels
        },
        tabBarStyle: {
          backgroundColor: '#321C43', // Background color of the tab bar
          paddingTop:10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#EADDF3',
          // padding:1.5
        },
        tabBarPressColor:'rgba(234, 221, 243, 0.2)', // Disable touch effect color
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
