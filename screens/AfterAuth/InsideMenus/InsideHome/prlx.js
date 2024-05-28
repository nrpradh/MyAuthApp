import React from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, } from '../../../../firebaseAPI';// Ensure this points to your firebase configuration file

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

  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1, marginBottom:20,}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={combinedData}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View style={{alignItems:'center' }} >
            <Image
              source={{ uri: item.imageSource }} // Assuming image is a property in each event object
              style={{ width: width, height: width / 2 }}
            />

            <Text style={{ textAlign: 'center' }}> {item.category} </Text>
            
          </View>
        )}
      />
    </View>
  );
}

export default Index;
