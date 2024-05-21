import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//import Global Style
import { forCategories } from './homeGStyle';

//import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db,auth } from '../../../../firebaseAPI';
import { PGStyling } from '../../PGStyling';

const Categoriest = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const items = [
    { label: 'Tech', value: 'tech' },
    { label: 'Sports', value: 'sports' },
    { label: 'Competition', value: 'competition' },
    { label: 'Seminar', value: 'seminar' },
    { label: 'Online', value: 'online' },
    { label: 'Concert', value: 'concert' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Others', value: 'others' },
  ];

  const navigation = useNavigation();

  const toViewEvent = (event) => {
    navigation.navigate('ViewEventPage', { event });
  };

  const fetchData = async () => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return; // Exit if user not authenticated
    }

    const q = query(collection(db, 'newevent'));

    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map(doc => ({
     ...doc.data(),
      id: doc.id,
      category: doc.data().category, // Add category property to each event
    }));

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

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const renderCategory = (category) => {
    return (
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          key={category.value}
          onPress={() => handleCategoryPress(category.value)}>
          <Text style={styles.categoryText}>{category.label}</Text>
        </TouchableOpacity>
      </View>  
    );
  };

  const renderEvent = ({ item }) => {
    if (selectedCategory && item.category !== selectedCategory) {
      return null; // Don't render events that don't match the selected category
    }
 
    return (
      <TouchableOpacity onPress={() => toViewEvent(item)} key={item.id}>
        <View style={forCategories.itemContainer}>
          <Image source={{ uri: item.imageSource }} style={styles.image} />
          <View style={styles.textMargin}>
           <Text style={forCategories.overlayText}>{item.eventName}</Text>
            <Text style={forCategories.locationText}>{item.location}</Text>
          </View>
          {/* Render other event details as needed */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={forCategories.theFrame}>
      <ScrollView 
        
        horizontal
        showsHorizontalScrollIndicator={false}>
        {items.map(renderCategory)}
      </ScrollView>
      <FlatList
        data={combinedData}
        keyExtractor={item => item.id}
        renderItem={renderEvent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categoriest;

const styles = StyleSheet.create ({
  categoryContainer: {
    backgroundColor: '#f1f1f1',
    padding: 8,
    marginHorizontal:2,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    // fontSize: 18,
    fontWeight: 'bold',
    color: '#353535',
  },
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