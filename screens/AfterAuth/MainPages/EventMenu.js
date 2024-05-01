import React, {useState} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { SpeedDial } from '@rneui/themed';

import ManageEvent from '../InsideMenus/InsideEvent/ManageEvent';
import EventLogs from '../InsideMenus/InsideEvent/EventLogs';


const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={route.key} // Add key prop to TouchableOpacity
          >
            
          </TouchableOpacity>
        );
      })}
      
    </View>
  );
}

const EventMenu = () => {
  return(
    <View style={{flex:1,}}>
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
      icon={{ name: 'edit', color: '#f1f1f1' }}
      openIcon={{ name: 'close', color: '#f1f1f1' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      buttonStyle={{backgroundColor:'#353535'}} 
      containerStyle={{ borderWidth: 0.5, borderColor: '#6155e5' }}
    >
      <SpeedDial.Action
        icon={{ name: 'add', color: '#f1f1f1' }}
        buttonStyle={{backgroundColor:'#353535', }}
        title="Create event"
        titleStyle={{ color: '#6155e5' }}
        containerStyle={{ borderWidth: 0.5, borderColor: '#6155e5' }}
        onPress={handleNavigation} // Call the handleNavigation function
      />
    </SpeedDial>
  )

}

const TopTabNav = () => {
  return (
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Manage" component={ManageEvent} />
        <Tab.Screen name="Logs" component={EventLogs} />
      </Tab.Navigator>
      
      
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})

export default EventMenu;
