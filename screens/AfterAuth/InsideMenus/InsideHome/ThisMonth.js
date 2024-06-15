import react, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import LabelsProp from '../../../../components/labelsProp';
import { getAuth } from 'firebase/auth';
import { collection, query, where, Timestamp, startOfMonth, endOfMonth, db,  limit, orderBy, onSnapshot } from '../../../../firebaseAPI';


const ThisMonth = () => {
 
  const [combinedData, setCombinedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return; // Exit if user not authenticated
    }

    const q = query(collection(db, 'newevent'), limit(3));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const events = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        selectedDate: doc.data().selectedDate
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

  const navigation = useNavigation();

  const toViewEvent = (event) => {
    navigation.navigate('ViewEventPage', { event });
  };

  return (
    <View style={{ padding: 8, marginTop: 5 }}>
      <Text style={styles.h1}>This Month</Text>
      <FlatList
        data={combinedData}
        // numColumns={1}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={{}}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.imageSource }} style={styles.image} />
              <LabelsProp
                nameLabel={item.eventName} 
                locLabel={item.location} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}


export default ThisMonth

const styles = StyleSheet.create({

    h1 : {
      color:'#f1f1f1',
      fontSize:18,
      fontWeight:'500',
      marginVertical:6,

    },

    cardContainer :{
      flexDirection:'row',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor:'#E4D4F1',
      
    },

    image: {
      marginRight:8,
      resizeMode: 'cover',
      borderRadius: 2,
      width: '50%',
      height: 100, // Adjust image height as needed
    },
    
    
    


    



})