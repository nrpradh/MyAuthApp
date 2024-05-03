import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, RefreshControl, TouchableOpacity, Pressable } from 'react-native';

//import Global Style
import { forCategories } from './homeGStyle';

//import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs,db } from '../../../../firebaseAPI';

const CombinedEventDataScreen = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return; // Exit if user not authenticated
      }

      const q = query(collection(db, 'newevent'));

      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setCombinedData(events);
    } catch (error) {
      console.error('Error fetching documents: ', error);
    } finally {
      setRefreshing(false); // Turn off refreshing indicator
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing indicator to true
    fetchData(); // Fetch data again
  };

  const handleEventPress = (eventId) => {
    // Handle event press, for example, navigate to event details screen
    console.log(`Event ${eventId} pressed`);
  };
  return (
    <ScrollView
      contentContainerStyle={forCategories.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
    {combinedData.map(event => (
      <TouchableOpacity key={event.id} onPress={() => handleEventPress(event.id)}>
        <View key={event.id} style={forCategories.itemContainer}>
          <Image source={{ uri: event.imageSource }} style={forCategories.image} />
          <View style={forCategories.overlay}>
            <Text style={forCategories.overlayText}>{event.eventName}</Text>
          </View>
          {/* Render other event details as needed */}
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  
});

export default CombinedEventDataScreen;
