import { StyleSheet, Text, View, Button, BackHandler } from 'react-native'
import React,{useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


// firebase
import {auth} from '../../../firebaseAPI';

const Home = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      // Return true to prevent the default back button behavior
      return true;
    };
  
    // Add event listener for the hardware back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
  
    // Clean up event listener when the component unmounts
    return () => backHandler.remove();
  }, []);
  
  const MyID = auth.currentUser.email

  const handleLogout = () => {
    auth.signOut()
    .then(() => {
      // Logout successful
      console.log(`User ${MyID} logged out successfully`);
      // You can navigate to a different screen or perform any other action upon logout
      navigation.navigate('LandingPage');
    })
    .catch((error) => {
      // Handle errors here
      console.error('Error logging out:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text> {MyID} </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#909090'
  }
})