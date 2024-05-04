import { StyleSheet, Text, View, Button, BackHandler, TouchableOpacity, ActivityIndicator } from 'react-native'
import React,{useEffect, useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../PGStyling';
import CategoryFilter from '../InsideMenus/InsideHome/Categories';
import SearchDataBar from '../../../components/searchDataBar';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(false); // State to track loading status

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

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400); // Simulated loading time in milliseconds
  }, []);
  

  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <View style={PGStyling.forContainer}>
        <SearchDataBar/>
        <CategoryFilter/>
        <Button onPress={() => navigation.navigate('Categories')} title="Next page" color='#353535' />

        
        {/* uncomment and use this when the home Page is done 
        {loading ? (
        <ActivityIndicator size={40} color="#6155e5" />
        ) : (
          <>
          <CategoryFilter/>
          <Button onPress={() => navigation.navigate('Categories')} title="Next page" color='#353535' />
          </>
        )} */}
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
});
