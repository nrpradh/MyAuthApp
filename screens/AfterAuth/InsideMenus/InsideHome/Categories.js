import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, TouchableOpacity, FlatList } from 'react-native';

//import Global Style
import { forCategories } from './homeGStyle';

//import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db,auth } from '../../../../firebaseAPI';

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
    <View style={forCategories.theFrame}> 
      <FlatList
        horizontal
        data={combinedData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress([item.eventName,  item.id])}>
            <View style={forCategories.itemContainer}>
              <Image source={{ uri: item.imageSource }} style={styles.image} />
                <View style={styles.textMargin}>
                  <Text style={forCategories.overlayText}>{item.eventName}</Text>
                  <Text style={forCategories.locationText}>{item.location}</Text>
                </View>
              {/* Render other event details as needed */}
            </View>
            
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CombinedEventDataScreen;

const styles = StyleSheet.create ({
  image: {
    resizeMode:'cover',
    borderRadius: 2,
    width: 180, 
    height: 125 // Adjust image height as needed
  },
  textMargin: {
    padding:5,
  }

})