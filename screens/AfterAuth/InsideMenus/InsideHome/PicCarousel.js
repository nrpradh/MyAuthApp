import React from 'react';
import {  Text, View, Image, useWindowDimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, limit, orderBy, onSnapshot } from '../../../../firebaseAPI';// Ensure this points to your firebase configuration file
import { forCategories } from './homeGStyle';


const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const fetchData = (setCombinedData, setRefreshing) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  ;

  if (!currentUser) {
    return; // Exit if user not authenticated
  }

  const today = new Date();
  const currentMonth = today.getMonth(); // getMonth() returns 0-11
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  
  const q = query(
    collection(db, 'newevent'), 
    // orderBy("createdAt", "desc"), 
    where('selectedDate', '>=', `${months[currentMonth]} ${currentDate} ${currentYear}`), 
    where('selectedDate', '<=', `${months[currentMonth]} 31 ${currentYear}`), 
    limit(6));

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

const Crousel = () => {
  const [combinedData, setCombinedData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState('')
  const [limitedData, setLimitedData] = React.useState(combinedData.slice(0, 5));

  React.useEffect(() => {
    fetchData(setCombinedData, setRefreshing);
  }, []);

  const { width } = useWindowDimensions();
  const adjustedWidth = width - 22

  return (
    <View style={styles.prlxContainer}>
      <Carousel
        loop
        width={adjustedWidth}
        height={width/2}
        autoPlay={true}
        data={combinedData}
        scrollAnimationDuration={800}
        onSnapToItem={(index) => {
          if (index >= limitedData.length - 2) {
            setLimitedData(combinedData.slice(0, limitedData.length + 5));
          }
        }}
        renderItem={({ item }) => (
          <View style={styles.imageContainer} >
            <Image
              source={{ uri: item.imageSource }} 
              style={styles.image}
            />

            {/* <Text style={{ textAlign: 'center', color:'#f1f1f1' }}> {item.eventName} </Text> */}
            
          </View>
        )}
      />
    </View>
  );
}

export default Crousel;
 

const styles = StyleSheet.create({
    prlxContainer : {
        marginBottom: 15, 
        // backgroundColor: '#353535',
        borderColor:'#E4D4F1',
        borderWidth:0.5,
        borderRadius:5, 
        paddingHorizontal: 10, 
        paddingVertical:8, 

    },

    imageContainer :{
      justifyContent:'center',
      // backgroundColor:'red',
      width:'95%',  
      padding:2, 
      borderRadius:2,
      // borderTopWidth:1, 
      borderColor:'#E4D4F1'  
    },

    image: {
        // marginRight:10,
        resizeMode: 'cover',
        borderRadius: 2,
        width: '100%',
        height: '100%',
    }

 })

