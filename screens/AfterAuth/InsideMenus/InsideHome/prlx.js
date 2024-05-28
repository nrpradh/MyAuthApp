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

const Index = () => {
  const [combinedData, setCombinedData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);

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
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={{justifyContent:'center', width:'95%',  borderRadius:2,padding:20, borderWidth:1, borderColor:'lightblue'  }} >
            <Image
              source={{ uri: item.imageSource }} 
              style={styles.image}
            />

            {/* <Text style={{ textAlign: 'center', color:'#f1f1f1' }}> {item.category} </Text> */}
            
          </View>
        )}
      />
    </View>
  );
}

export default Index;
 

const styles = StyleSheet.create({
    prlxContainer : {
        marginBottom: 20, 
        backgroundColor: '#353535',
        borderRadius:5, 
        paddingHorizontal: 10, 
        paddingVertical:10, 

    },
    image: {
        marginRight:10,
        resizeMode: 'cover',
        borderRadius: 10,
        width: '100%',
        height: '100%',
    }

 })

