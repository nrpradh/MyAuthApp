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
          <View style={styles.theBtn}>
              <Feather name='log-out' size={22} color="#F72F31" marginLeft={5} />
              <View style={{flexDirection:'column'}}>
                  <Text style={styles.logOutOnly}>Log Out</Text>
                  {/* <Text style={styles.logOutSubOnly}> Log out from this account </Text> */}
              </View>
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    logOutPos:{
      // width:150,
      // backgroundColor:'blue',
      // flex:1,
      // paddingHorizontal:10,
      alignItems:'center',
      justifyContent:'flex-end'
    },
    theBtn: {
      flexDirection: 'row',
      borderRadius: 25,
      backgroundColor: '#353535',
      padding: 10,
      paddingHorizontal:15,
      marginVertical:5,
      
    },
    

    logOutOnly:{
        color: '#F72F31',
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
