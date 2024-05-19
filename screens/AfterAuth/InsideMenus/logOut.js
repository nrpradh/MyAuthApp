import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

import { auth } from '../../../firebaseAPI';
import { ForProfile } from './InsideGStyles';
import { getAuth } from 'firebase/auth';

const LogOut = () => {
  const navigation = useNavigation(); 
  const auth = getAuth();
  const user = auth.currentUser

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('LandingPage');
      console.log(user.email, 'logged out');
      
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }

  return (
    <View style={styles.logOutPos}>
      <TouchableOpacity onPress={handleLogout}>
          <View style={[ForProfile.profileContent, {backgroundColor:'#f1f1f1'}]}>
              <Feather name='log-out' size={22} color="#C40002" marginLeft={5} />
              <View style={{flexDirection:'column'}}>
                  <Text style={styles.logOutOnly}>Log Out</Text>
                  <Text style={styles.logOutSubOnly}> Log out from this account </Text>
              </View>
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    logOutPos:{
      // width:200,
      // backgroundColor:'blue',
      flex:1,
      // paddingHorizontal:10,
      alignItems:'flex-end',
      // justifyContent:'flex-end'
    },

    logOutOnly:{
        color: '#C40002',
        // paddingTop: 2,
        marginLeft: 20,
        fontSize: 16,
      },
      logOutSubOnly: {
        color: 'rgba(155, 8, 13, 0.65)',
        // paddingBottom: 2,
        marginLeft: 17,
        fontSize: 11,
    },        
})
export default LogOut;
