import React from 'react';
import {  Text, View, Image, useWindowDimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, } from '../../../../firebaseAPI';// Ensure this points to your firebase configuration file
import { forCategories } from './homeGStyle';

const fetchData = async (setCombinedData, setRefreshing) => {
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

const Crousel = () => {
  const [combinedData, setCombinedData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
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

