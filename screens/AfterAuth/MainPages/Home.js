import { StyleSheet, Text, View, Button, BackHandler, TouchableOpacity } from 'react-native'
import React,{useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../PGStyling';




const Home = ({navigation}) => {
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );
  

  
  return (
    <LinearGradient
      colors={['#f1f1f1', '#6155e5', '#353535']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}  
      style={styles.container}
    >
      <View style={PGStyling.forContainer}>
        
        

        <Button onPress={() => navigation.navigate('Categories')} title="Next page" />

      </View>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  }
 
})