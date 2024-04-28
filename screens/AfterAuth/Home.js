import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {auth} from '../../firebaseAPI';

const Home = () => {
  const MyID = auth.currentUser.email

  return (
    <View>
      <Text> {MyID} </Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})