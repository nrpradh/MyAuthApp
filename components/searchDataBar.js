import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, TouchableOpacity, TextInput, FlatList } from 'react-native';

// Import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, orderBy, startAt, endAt } from '../firebaseAPI';

const SearchDataBar = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return; // Exit if user not authenticated
      }

      let q = query(collection(db, 'newevent'));

      // Apply search filter if searchQuery is not empty
      if (searchQuery) {
        q = query(
          q,
          where('eventName', '>=', searchQuery), // StartAt searchQuery
          where('eventName', '<=', searchQuery + '\uf8ff') // EndAt searchQuery + any character
        );
      }

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
  }, [searchQuery]); // Fetch data again when searchQuery changes

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing indicator to true
    fetchData(); // Fetch data again
  };

  const handleEventPress = (eventId) => {
    // Handle event press, for example, navigate to event details screen
    console.log(`Event ${eventId} pressed`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={combinedData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEventPress(item.id)}>
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.imageSource }} style={styles.image} />
              <Text>{item.eventName}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#353535',
    borderRadius: 5,
    borderColor: '#6155e5',
    borderWidth: 0.5,
    padding: 10,
    marginHorizontal: 2,
    marginBottom:15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default SearchDataBar;
