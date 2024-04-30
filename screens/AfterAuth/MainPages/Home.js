import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// firebase
import {auth} from '../../../firebaseAPI';

const Home = () => {
  const MyID = auth.currentUser.email

  return (
    <View style={styles.container}>
      <Text> {MyID} </Text>
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