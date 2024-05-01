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
  
  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <Text >Profile</Text>
        {/* <Text> {MyID} </Text> */}
      </View>
      
      <LogOut/>
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