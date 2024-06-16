import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import Global Style
import { forCategories } from './homeGStyle';
import ViewAllProp from '../../../../components/viewAllNav';
import CatLabelsProp from '../../../../components/catLabelsProp';

// Import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, auth, limit, orderBy, onSnapshot } from '../../../../firebaseAPI';
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

  const fetchData = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      return; // Exit if user not authenticated
    }
  
    const q = query(collection(db, 'newevent'), limit(6));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const events = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        category: doc.data().category, // Add category property to each event
      }));
  
      setCombinedData(events);
      setRefreshing(false); // Turn off refreshing indicator
    }, (error) => {
      console.error('Error fetching documents: ', error);
    });
  
    return unsubscribe;
  };
  
  useEffect(() => {
    const unsubscribe = fetchData();
    return unsubscribe;
  }, []);
  
  const onRefresh = () => {
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
          <View style={forCategories.noCatFrame} >
            <Text style={{
              color:'rgba(234, 221, 243, 0.4)',
              fontSize:12,
              textAlign:'center'
            }}>-- No events available for the selected category/categories --</Text>
            
          </View>
        ) : (
          <View style={{marginVertical:5,}}>
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => toViewEvent(item)}>
                  <View style={forCategories.itemContainer}>
                    <Image source={{ uri: item.imageSource }} style={styles.image} />
                    <CatLabelsProp
                      nameLabel={item.eventName} 
                      locLabel={item.location} />
                  </View>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          </View>
        )}
      <ViewAllProp toWhere={() => console.log('To view events based on their categories')} />


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
    borderColor:'#E4D4F1'
    // backgroundColor: '#E4D4F1',
  },

  categoryButtonText: {
    fontWeight:500,
    color: '#E4D4F1',
  },

  selectedCategoryButton: {
    backgroundColor: '#E4D4F1', // Change to your selected color
  },
  
  selectedCategoryButtonText: {
    color: '#321c43', // Change to your selected color
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 2,
    width: '100%',
    height: 125, // Adjust image height as needed
  },
  textMargin: {
    padding: 6,
  },
});
