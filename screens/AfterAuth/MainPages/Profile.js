import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from '../../../firebaseAPI';

import { PGStyling } from '../PGStyling';


// Components
import LogOut from '../InsideMenus/logOut';
import BtnForProfile from '../InsideMenus/InsideProfile/btnForProfile'
import { ForProfile } from '../InsideMenus/InsideGStyles';

const Profile = ({navigation}) => {
  const MyID = auth.currentUser.email
  const displayName = auth.currentUser.displayNamedisplayName;
  
  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <Text >Profile</Text>
        <Text> {displayName} </Text>
        <Text> {MyID} </Text>
      </View>

      <View style={ForProfile.proFrame}>
        <Text style={ForProfile.headerFrame}> General </Text>
        <BtnForProfile 
          icon={<MaterialIcons name="history" size={26} color="#f1f1f1" marginLeft={2} />}
          headText="Event Logs"
          subHeading="The list of your event logs"
          onPress={() => navigation.navigate('EventLogsPage')}
        />
        
        <BtnForProfile 
          icon={<Feather name="book-open" size={22} color="#f1f1f1" marginLeft={5}  />}
          headText="Terms of use"
          subHeading="User guidelines, rights, agreements, etc."
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
      <View style={ForProfile.proFrame}>
        <Text style={ForProfile.headerFrame} > Preferences </Text>
        <BtnForProfile 
          icon={<Feather name="help-circle" size={25} color="#f1f1f1" marginLeft={2} />}
          headText="About"
          subHeading="About the app and etc."
          onPress={() => navigation.navigate('EventLogsPage')}
        />
        <BtnForProfile 
          icon={<MaterialCommunityIcons name="comment-question-outline" size={22} color="#f1f1f1" marginLeft={5}  />}
          headText="FAQ"
          subHeading="Frequently asked question"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        <LogOut/>
      </View>
      
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