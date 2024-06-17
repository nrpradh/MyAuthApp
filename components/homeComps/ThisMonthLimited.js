import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal'; // Import Modal from react-native-modal

import LabelsProp from './labelsProp'; // Assuming this is a custom component for labels
import { getAuth } from 'firebase/auth';
import { collection, query, where, limit, orderBy, onSnapshot, db } from '../../firebaseAPI';
import ViewAllProp from '../viewAllNav';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const ThisMonthLimited = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // State to manage selected event for modal
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

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
        console.error('Error fetching documents: ', error); // Handle error if any
      });

      return unsubscribe; // Return unsubscribe function to stop listening to snapshot changes
    };

    fetchEventData();
  }, []);

  // Function to open modal and set selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  // Function to close modal
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
      <ViewAllProp toWhere={toViewWholeEvents} />

      {/* Modal Component */}
      <Modal 
        isVisible={isModalVisible} 
        onBackdropPress={closeModal}
        animationIn={'fadeInUp'}
        animationInTiming={300}
        animationOut={'slideOutRight'}
        >
        <View style={styles.modalContent}>
          <Image source={{ uri: selectedEvent?.imageSource }} style={styles.modalImage} />
          <LabelsProp
            nameLabel={selectedEvent?.eventName}
            locLabel={selectedEvent?.location}
            dateLabel={selectedEvent?.selectedDate}
          />
          {/* <Text style={styles.modalTitle}>{selectedEvent?.description}</Text> */}
          <Text style={{color:'#f1f1f1'}}>{selectedEvent?.description}</Text>
        </View>
      </Modal>
    </View>
  );
};

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
  modalContent: {
    backgroundColor: 'rgba(50, 28, 67,0.8)',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#E4D4F1',
    
  },
  modalTitle: {
    fontSize: 22,
    // fontWeight: 'bold',
    fontSize:'#E4D4F1',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 180,
    resizeMode:'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
});
export default ThisMonthLimited;
