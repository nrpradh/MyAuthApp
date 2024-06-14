import react, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, auth, limit, orderBy, onSnapshot } from '../../../../firebaseAPI';

const ThisMonth = () => {
 
const [combinedData, setCombinedData] = useState([]);
const [refreshing, setRefreshing] = useState(false);

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

  return (
    <View style={{ padding: 8, marginTop: 5 }}>
      <Text style={styles.h1}>This Month</Text>
      {combinedData.map((event, index) => (
        <View>
          <Image source={{ uri: event.imageSource }} style={styles.image} />
          <Text key={index} style={styles.eventText}>{event.eventName}</Text>
        </View>
      ))}
    </View>
  );
}


export default ThisMonth

const styles = StyleSheet.create({
    h1 : {
      // marginTop:15,
      color:'#f1f1f1',
      fontSize:18,
      fontWeight:'500',
      marginVertical:6,
    },

    image: {
      resizeMode: 'cover',
      borderRadius: 2,
      width: '50%',
      height: 125, // Adjust image height as needed
    },

    eventText : {
      color:'#f1f1f1',
    }

    



})