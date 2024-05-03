import { StyleSheet, Text, View, Button, BackHandler, TouchableOpacity } from 'react-native'
import React,{useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../PGStyling';
import CategoryFilter from '../InsideMenus/InsideHome/Categories';



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
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <CategoryFilter/>
        

        <Button onPress={() => navigation.navigate('Categories')} title="Next page" color='#353535' />

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