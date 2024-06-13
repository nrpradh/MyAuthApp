import { StyleSheet, Text, View, Button, BackHandler, TouchableOpacity, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
import React,{useEffect, useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../PGStyling';
import Prlx from '../InsideMenus/InsideHome/prlx';
import CategoryFilter from '../InsideMenus/InsideHome/Categories';
import ThisMonth from '../InsideMenus/InsideHome/ThisMonth';

const Home = ({navigation }) => {
  const [loading, setLoading] = useState(false); // State to track loading status

  const [refreshing, setRefreshing] = useState(false);

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
    }, 60);
  }, []);

  
  

  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
        <Prlx/>
        <CategoryFilter />
        <ThisMonth/>
        
       
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
   
  },

  btnGoTo :{
    
    padding:12,
    borderRadius:20,
    alignItems:'center',
    backgroundColor:'#f1f1f1'
  }
});
