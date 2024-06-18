import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; 

import { ThisMonthLabels } from './LabelProps'; 
import { collection, query, where, limit, orderBy, onSnapshot, db } from '../../firebaseAPI';
import ViewAllProp from '../viewAllNav';
import { Ionicons } from '@expo/vector-icons';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ThisMonthLimited = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

  useEffect(() => {
    const fetchEventData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return; // Exit if user is not authenticated
      }

      const today = new Date();
      const currentMonth = today.getMonth(); // getMonth() returns 0-11
      const currentYear = today.getFullYear();
      const currentDate = today.getDate();

      setCurrentTime(`${months[currentMonth]} ${currentYear}`); 

      const q = query(
        collection(db, 'newevent'),
        where('selectedDate', '>=', `${months[currentMonth]} ${currentDate} ${currentYear}`), 
        where('selectedDate', '<=', `${months[currentMonth]} 31 ${currentYear}`), 
        limit(3) 
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

        setData(sortedEvents); // Set sorted data into state
      }, (error) => {
        console.error('Error fetching documents: ', error); 
      });

      return unsubscribe; // Return unsubscribe function to stop listening to snapshot changes
    };

    fetchEventData();
  }, []);

  const DescriptionWithInstagramLinks = ({ description }) => {
    // Split the description text into parts
    const parts = description.split(/(@[a-zA-Z0-9_]+)/g);
  
    // Directly open someone's profile
    const handleInstagramUsernameClick = (username) => {
      const instagramUrl = `https://www.instagram.com/${username}`;
      Linking.openURL(instagramUrl);
    };
  
    return (
      <View style={modalStyles.container}>
        <Text style={modalStyles.regularText}>
          {parts.map((part, index) => {
            if (part.startsWith('@')) {
              // an Instagram username
              const username = part.slice(1); // to remove the '@' symbol
              return (
                <Text
                  key={index}
                  style={modalStyles.instagramUsername}
                  onPress={() => handleInstagramUsernameClick(username)}>
                  {part}
                </Text>
              );
            } else {
              // regular text
              return part;
            }
          })}
        </Text>
      </View>
    );
  };

  const [ address, setAddress] = useState('');
  const openMaps = () => {
    const formattedAddress = address.replace(/\s/g, '+');
    let url;
  
    // Check the platform 
    if (Platform.OS === 'android') {
      url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
      // console.log("URL:", url);
    } else if (Platform.OS === 'ios') {
      url = `http://maps.apple.com/?q=${formattedAddress}`;
    } else {
      console.warn('Unsupported platform');
      return;
    }
  
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleAddressPress = () => {
    if  (address) {
        console.log("opened address :", address);
        
        openMaps();
    }   else {
        console.warn('Location is not provided');
    }
  };
  
  const openModal = (event) => {
    setSelectedEvent(event);
    setAddress(event.location);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const toViewWholeEvents = () => {
    navigation.navigate('ThisMonthEventsPage');
  };

  const toViewEvent = (event) => {
    navigation.navigate('ViewEventPage', { event });
  };

  return (
    <View style={{ padding: 2, marginTop: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={styles.h1}>This Month</Text>
        <Text style={{ color: 'lightgrey', marginVertical: 8, marginLeft: 7 }}> {currentTime} </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.imageSource }} style={styles.image} />
              <ThisMonthLabels
                nameLabel={item.eventName}
                locLabel={item.location}
                dateLabel={item.selectedDate}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <ViewAllProp toWhere={toViewWholeEvents} />

      {/* Modal Component */}
      <Modal 
        isVisible={isModalVisible} 
        onBackdropPress={closeModal}
        animationIn={'fadeInUp'}
        animationInTiming={340}
        animationOut={'slideOutRight'}
        animationOutTiming={320}
        >
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>{selectedEvent?.eventName} </Text>
          <Image source={{ uri: selectedEvent?.imageSource }} style={modalStyles.modalImage} />
          <View style={modalStyles.dateLocContainer}>
            <TouchableOpacity onPress={openMaps}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='location-outline' size={18} color={'#e4d4f1'} marginRight={4}/>
                <Text style={[
                  modalStyles.dateLoc, {
                    textDecorationLine:'underline',
                    color:'#e4d4f1'
                    
                    }]}>{selectedEvent?.location}</Text>
              </View>
            </TouchableOpacity>
            <Text style={modalStyles.dateLoc}> {selectedEvent?.selectedDate} </Text>
          </View>
          <DescriptionWithInstagramLinks description={selectedEvent?.description} />
          {/* <Text style={{color:'#f1f1f1', textAlign:'justify', paddingHorizontal:5}}>{selectedEvent?.description}</Text> */}
        </View>
      </Modal>
    </View>
  );
};

export default ThisMonthLimited;

const styles = StyleSheet.create({
  h1: {
    color: '#f1f1f1',
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 6,
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E4D4F1',
  },
  image: {
    marginRight: 8,
    resizeMode: 'cover',
    borderRadius: 2,
    width: '50%',
    height: 100,
  },
  
});

const modalStyles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'rgba(50, 28, 67,0.8)',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E4D4F1',
    
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '500',
    color:'#f1f1f1',
    marginVertical: 2,
    textAlign:'center'
  },
  dateLocContainer : {
    flexDirection: 'row', 
    alignItems: 'center',   
    justifyContent:'space-between', 
    marginHorizontal:2,  
  },

  dateLoc: {
    color:'lightgrey',
    marginVertical:5,
  },
  modalImage: {
    width: '100%',
    height: 180,
    resizeMode:'cover',
    borderRadius: 5,
    marginVertical: 10,
  }, 

  //  description styling
    container: {
        flexDirection: 'row',
        flexWrap:'wrap',
        // margin:10,
        padding:5,
        // backgroundColor: 'black', 
        
    },
    regularText: {
        // fontSize:13,
        marginLeft:5,
        color:'#f1f1f1',
        textAlign:'justify',

        
    },
    instagramUsername: {
        // fontSize:13,
        color: '#f1f123',
        textAlign:'justify',
       
    },
})