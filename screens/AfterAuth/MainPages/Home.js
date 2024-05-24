import { StyleSheet, Text, View, Button, BackHandler, TouchableOpacity, RefreshControl, ScrollView } from 'react-native'
import React,{useEffect, useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../PGStyling';
import CategoryFilter from '../InsideMenus/InsideHome/Categories';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(false); // State to track loading status

  const [refreshing, setRefreshing] = useState(false);

  const [searchBarActive, setSearchBarActive] = useState(false);


  // _______________ * ________________ * User Go Back Disabled
  // useFocusEffect(
  //   useCallback(() => {
  //     const backAction = () => {
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction
  //     );

  //     return () => backHandler.remove();
  //   }, [])
  // );
  // useEffect(() => {
  //   // Simulate loading data
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 400); // Simulated loading time in milliseconds
  // }, []);

  // _______________ * ________________ * ________________

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  
  

  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <ScrollView
        contentContainerStyle={PGStyling.forContainer}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        <CategoryFilter />
        <Button onPress={() => navigation.navigate('Categories')} title="Next page" color='rgba(25, 25, 25, 0.7)' />
        {/* Other content goes here */}
        
      </ScrollView>
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
