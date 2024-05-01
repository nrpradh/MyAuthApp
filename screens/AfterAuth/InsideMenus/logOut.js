import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

import { auth } from '../../../firebaseAPI';
import { ForProfile } from './InsideGStyles';

const LogOut = () => {
  const navigation = useNavigation(); 

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('LandingPage');
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  return (
    <TouchableOpacity onPress={handleLogout}>
        <View style={ForProfile.profileContent}>
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
