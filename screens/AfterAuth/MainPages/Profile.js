import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


import { PGStyling } from '../PGStyling';

// firebase
import {auth} from '../../../firebaseAPI';

// Components
import LogOut from '../logOut';

const Profile = ({navigation}) => {
  // const MyID = auth.currentUser.email
  const handleLogout = () => {
    
    auth.signOut().then(() => {
      
      // Logout successful
      // console.log(`User ${MyID} logged out successfully`);
      // You can navigate to a different screen or perform any other action upon logout
      navigation.navigate('LandingPage');
    })
    .catch((error) => {
      // Handle errors here
      console.error('Error logging out:', error);
    });
  }
  return (
    <LinearGradient
      colors={['#f1f1f1', '#6155e5', '#353535']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}  
      style={styles.container}
    >
      <View style={PGStyling.forContainer}>
        <Text >Profile</Text>
        {/* <Text> {MyID} </Text> */}
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View style={PGStyling.profileContent}>
            <Text> Log out </Text>
        </View>
      </TouchableOpacity>
      {/* <LogOut/> */}
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },

})