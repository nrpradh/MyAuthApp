import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import Global Style
import { forCategories } from './homeGStyle';

// Import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, auth } from '../../../../firebaseAPI';
import { PGStyling } from '../../PGStyling';

const Categoriest = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState('Tech');
  const [categories, setCategories] = useState([
    { label: 'Tech', value: 'Tech', id: 0 },
    { label: 'Sports', value: 'Sports', id: 1 },
    { label: 'Competition', value: 'Competition', id: 2 },
    { label: 'Tour', value: 'Tour', id: 3 },
    { label: 'Seminar', value: 'Seminar', id: 4 },
    { label: 'Online', value: 'Online', id: 5 },
    { label: 'Concert', value: 'Concert', id: 6 },
    { label: 'Workshop', value: 'Workshop', id: 7 },
    { label: 'Others', value: 'Others', id: 8 },
  ]);

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
    setRefreshing(true); 
    fetchData();
  };

  const handleCategorySelection = (value) => {
    setSelectedCategory(value);
  };

  const filteredData = combinedData.filter(item => {
    // Check if the event belongs to at least one of the selected categories
    const selectedCategories = Array.isArray(selectedCategory) ? selectedCategory : [selectedCategory];
    return selectedCategories.some(cat => item.category.includes(cat));
  });

  return (
    <View style={{marginTop:5,}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleCategorySelection(category.value)}
            style={[
              styles.categoryButton,
              selectedCategory === category.value && styles.selectedCategoryButton,
            ]}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.value && styles.selectedCategoryButtonText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      
        {filteredData.length === 0 ? (
          <View style={forCategories.noCatFrame}>
            <Text style={{
              color:'grey',
              fontSize:12,
              textAlign:'center'
            }}>No events available for the selected category/categories.</Text>
            
          </View>
        ) : (
          <View style={forCategories.catFrame}>
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toViewEvent(item)}>
                  <View style={forCategories.itemContainer}>
                    <Image source={{ uri: item.imageSource }} style={styles.image} />
                    <View style={styles.textMargin}>
                      <Text style={forCategories.overlayText}>{item.eventName}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <Ionicons name="location-outline" size={14} color="lightblue" marginRight={4} />
                        <Text style={forCategories.locationText}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          </View>
        )}
      

    </View>
      
  );
};

export default Categoriest;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // padding:10,
    marginRight: 8,
    marginBottom:5,
    borderRadius: 20,
    borderWidth:0.8,
    borderColor:'#353535'
    // backgroundColor: '#353535',
  },

  categoryButtonText: {
    fontWeight:500,
    color: '#353535',
  },

  selectedCategoryButton: {
    backgroundColor: '#353535', // Change to your selected color
  },
  
  selectedCategoryButtonText: {
    color: '#f1f1f1', // Change to your selected color
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 2,
    width: 180,
    height: 125, // Adjust image height as needed
  },
  textMargin: {
    padding: 5,
  },
});
