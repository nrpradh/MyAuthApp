import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Import Global Style
import { searchBarStyling } from '../../screens/AfterAuth/InsideMenus/InsideHome/homeGStyle';

// Import Firestore
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, db, orderBy, startAt, endAt, limit } from '../../firebaseAPI';

const SearchDataBar = () => {
  const [combinedData, setCombinedData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                return;
            }

            const q = query(collection(db, 'newevent'), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const events = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            const eventsWithCreators = await Promise.all(events.map(async event => {
                const profileQuery = query(collection(db, 'userprofile'), where('uid', '==', event.uid));
                const profileSnapshot = await getDocs(profileQuery);
                const eventCreatorProfile = !profileSnapshot.empty ? profileSnapshot.docs[0].data() : null;
                return {
                    ...event,
                    eventCreatorProfile
                };
            }));

            if (searchQuery) {
                const filteredEvents = eventsWithCreators.filter(
                    event => event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.location.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setCombinedData(filteredEvents);
            } else {
                setCombinedData(eventsWithCreators);
            }
        } catch (error) {
            console.error('Error fetching documents: ', error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const toViewEvent = (event) => {
        navigation.navigate('ViewEventPage', { event, eventCreatorProfile: event.eventCreatorProfile });
    };


  const handleEventPress = (eventName) => {
    console.log(`Event ${eventName} pressed`);
  };

  const handleSearchBarClick = () => {
    setSearchClicked(true); 
  };

  const handleSearchBarBlur = () => {
    setSearchClicked(true); 
  };


  return (
    <View  
      style={{
        flex: 1,
        padding:10,
        // marginTop:40,  #E4D4F1
        backgroundColor:'rgba(50, 28, 67,0.9)'
      }}
      >
      <Divider 
        style={{
          height:2, 
          backgroundColor:'#e4d4f1', 
          marginVertical:18, marginHorizontal:90, 
          borderRadius:5,}} />
      
      <TextInput
        style={searchBarStyling.searchInput}
        placeholder="Search by the name or location.."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        color= '#E4D4F1'
        placeholderTextColor='rgba(228, 212, 241, 0.5)'
        onFocus={handleSearchBarClick}
        onBlur={handleSearchBarBlur}
      />
      
      <View
        style={{height:220,}}> 
        {searchClicked && ( // Conditionally render the FlatList based on searchClicked state
          <FlatList
            data={combinedData}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toViewEvent(item)}>
                <View style={searchBarStyling.itemContainer}>
                 
                  <Image source={{ uri: item.imageSource }} style={styles.image} />
                  <Text style={{color:'#E4D4F1', fontWeight:500,}}>{item.eventName}</Text>
                  <Text style={searchBarStyling.location}> {item.location} </Text>
                  
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
          
        )}
        
      </View>
      <Text style={{
          marginTop:20,
          textAlign:'center',
          fontSize:13,
          color:'rgba(228, 212, 241, 0.4)'
          }}
        > Latest events added*</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius:3
  },
});

export default SearchDataBar;
