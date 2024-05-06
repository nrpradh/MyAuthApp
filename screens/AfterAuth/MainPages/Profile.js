import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native'
import React,{useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { auth } from '../../../firebaseAPI';

import { PGStyling } from '../PGStyling';


// Components
import LogOut from '../InsideMenus/logOut';
import BtnForProfile from '../InsideMenus/InsideProfile/btnForProfile'
import { ForProfile } from '../InsideMenus/InsideGStyles';

const Profile = ({navigation}) => {
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    // Get the currently authenticated user
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if user is authenticated and has a display name
    if (user && user.displayName) {
      setUsername(user.displayName);
    }
  }, []);

  const MyID = auth.currentUser.email
  
  
  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <Text style={PGStyling.pageTitle} >Your Profile</Text>
        
        <View style={PGStyling.profileDetail}>
        <Image source={require('../../../assets/icon.png')} style={styles.image} />
          <View>
            <Text style={PGStyling.username}> {username}  </Text>
            <Text style={PGStyling.org}>  Organization </Text>
            <Text style={PGStyling.email}>  {MyID} </Text>
            
          </View>
          <TouchableOpacity>
              <Feather name="edit" size={20} color="#f1f1f1"  
                marginLeft={80}  
              /> 
          </TouchableOpacity>
        </View>
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
  image: {
    // alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 50,
    width: 75, 
    height: 75,
  },  

})