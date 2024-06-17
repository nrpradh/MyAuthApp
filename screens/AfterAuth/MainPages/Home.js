import { StyleSheet, Text, View, Button, SectionList, TouchableOpacity, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
import React,{useEffect, useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { PGStyling } from '../PGStyling';
import PicCarousel from '../InsideMenus/InsideHome/PicCarousel';
import CategoryFilter from '../InsideMenus/InsideHome/Categories';
import ThisMonthLimited from '../../../components/homeComps/ThisMonthLimited';

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

  const sections = [
    { title: '', data: [<PicCarousel />] },
    { title: '', data: [<CategoryFilter />] },
    { title: '', data: [<ThisMonthLimited />] },
    
  ];
  

  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <SectionList
        sections={sections}
        renderItem={({ item }) => item}
        showsVerticalScrollIndicator={false}
        // renderSectionHeader={({ section }) => (
        //   <Text>{section.title}</Text>
        // )}
        keyExtractor={(item, index) => index.toString()}
      />
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
