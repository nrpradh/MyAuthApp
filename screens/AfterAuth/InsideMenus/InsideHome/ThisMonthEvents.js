import react, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, LinearGradient, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PGStyling } from '../../PGStyling';
import LabelsProp from '../../../../components/homeComps/labelsProp';
import { getAuth } from 'firebase/auth';
import { collection, query, where, Timestamp, startOfMonth, endOfMonth, db,  limit, orderBy, onSnapshot } from '../../../../firebaseAPI';


const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ThisMonthEvents = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
  
      if (!currentUser) {
        return; // Exit if user is not authenticated
      }
  
      const currentMonth = new Date().getMonth(); // Get current month (0-indexed)
      const currentYear = new Date().getFullYear(); // Get current year
      const monthName = months[currentMonth]; // Get current month name
  
      setCurrentTime(monthName + ' ' + currentYear); // Set current time
  
      // Setup query to fetch data
      const q = query(
        collection(db, 'newevent'),
        where('selectedDate', '>=', `${months[currentMonth]} 01 ${currentYear}`),
        where('selectedDate', '<=', `${months[currentMonth]} 31 ${currentYear}`),
      );
  
      // Fetch data and handle response
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const events = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        // Sort events by selectedDate, closest to farthest
        const sortedEvents = events.sort((a, b) => {
          const dateA = new Date(a.selectedDate);
          const dateB = new Date(b.selectedDate);
          return dateA - dateB;
        });
  
        setData(sortedEvents); // Set sorted data into state or variable
      }, (error) => {
        console.error('Error fetching documents: ', error); // Handle error if any
      });
  
      return unsubscribe; // Return unsubscribe function to stop listening to snapshot changes when no longer needed
    };
  
    fetchEventData();
  }, []);
  // Kondisi ini kosong agar useEffect hanya dijalankan sekali saat komponen dimuat

  const toViewEvent = (event) => {
    navigation.navigate('ViewEventPage', { event });
  };

  return (
    <View style={styles.container}>
        <Text style={{ color: 'lightgrey',marginVertical:8, marginLeft:7, }}> {currentTime} </Text>
        <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toViewEvent(item)}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.imageSource }} style={styles.image} />
              <LabelsProp 
                nameLabel={item.eventName} 
                locLabel={item.location}
                dateLabel={item.selectedDate}
              />
              
              
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />


    </View>
    
  );
}



export default ThisMonthEvents

const styles = StyleSheet.create({
    container : {
        flex:1,
        padding:10,
        backgroundColor:'#321C75'

    },
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