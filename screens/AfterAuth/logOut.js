import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';

import {auth} from '../../firebaseAPI';
import { PGStyling } from './PGStyling';


const LogOut = ({ navigation }) => {
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
    <TouchableOpacity onPress={handleLogout}>
        <View style={PGStyling.profileContent}>
            <Feather name='log-out' size={22} color="#A00102" marginLeft={5} />
            <View style={{flexDirection:'column'}}>
                <Text style={styles.logOutOnly}>Log Out</Text>
                <Text style={styles.logOutSubOnly}> Log out from this account </Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
    logOutOnly:{
        color: '#A00102',
        paddingTop: 2,
        marginLeft: 20,
        fontSize: 16,
      },
      logOutSubOnly: {
        color: 'rgba(146, 2, 3, 0.7)',
        paddingBottom: 2,
        marginLeft: 17,
       fontSize: 11,
    },        
})
export default LogOut;