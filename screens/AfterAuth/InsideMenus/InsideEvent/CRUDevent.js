import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity, Image,Modal} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';


import { getAuth } from 'firebase/auth';
import { updateDoc, getDoc, deleteDoc, db, collection, where, getDocs, query, doc, setDoc } from '../../../../firebaseAPI';
import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent, inCRUDevent } from '../InsideGStyles'
import DatePicker from '../../../../components/datePicker';
import PickCategories from '../../../../components/pickCategories'

const CRUDevent = ({route}) => {
    const { event} = route.params;
    const navigation = useNavigation();
    
    // const [updateEvent, setUpdateEvent] = useState('');

    const [newImageSource, setNewImageSource] = useState(null);
    const [newEventName, setNewEventName] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const [newCategory, setNewCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      { label: 'Tech', value: 'tech' },
      { label: 'Sports', value: 'sports' },
      { label: 'Competition', value: 'competition' },
      { label: 'Seminar', value: 'seminar' },
      { label: 'Online', value: 'online' },
      { label: 'Concert', value: 'concert' },
      { label: 'Workshop', value: 'workshop' },
      { label: 'Others', value: 'others' },
    ]);

    const handleCategoryChange = (category) => { 
      setNewCategory(category);
    }


    const auth = getAuth();

    const handleUpdateEvent = async () => {
      try {
        // Get the current user
        const user = auth.currentUser;
        
        if (user) {
          // Reference to the user's document in the 'newevent' collection
          const newEventRef = collection(db, 'newevent');
          const q = query(newEventRef, where("eventName", "==", event.eventName));
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.docs.length > 0) {
            const userEventDocRef = querySnapshot.docs[0].ref;
            
            // Update user data in Firestore
            await updateDoc(userEventDocRef, {
              category:newCategory,
              imageSource: newImageSource,
              eventName: newEventName,
              selectedDate: newDate,
              location: newLocation,
              description: newDescription,
            });
            
            console.log('Event data updated successfully');
            navigation.navigate('EventMenuPage');
          } else {
            console.log('Event not found');
          }
        } else {
          throw new Error('No user is currently signed in');
        }
      } catch (error) {
        console.error('Error updating event data:', error.message);
        // Handle error (e.g., show error message to the user)
      }
    };

    const selectImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 3],
        quality: 1,
      });
  
      if (!pickerResult.cancelled) {
        const selectedImage = pickerResult.assets[0].uri;
        setNewImageSource(selectedImage);
        console.log('Image uploaded for box:', selectedImage);
      }
    };
    const handleDateChange = (formattedDateTime) => {
      setNewDate(formattedDateTime); 
    
    };

    useEffect(() => {
      // Set the values from params to the state variables
      setNewCategory(event.category)
      setNewImageSource(event.imageSource);
      setNewEventName(event.eventName);
      setNewDate(event.selectedDate);
      setNewLocation(event.location);
      setNewDescription(event.description);
    }, [
      event.category,
      event.imageSource,
      event.description, 
      event.eventName, 
      event.location, 
      event.selectedDate
    ]);

      

    return (
      <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
          {/* <PickCategories/> */}
          <PickCategories
            open={open}
            setOpen={setOpen}
            value={newCategory}
            setValue={setNewCategory}
            items={items}
            setItems={setItems}
            category={newCategory}
            setCategory={handleCategoryChange}
          />
          <ScrollView 
            style={{marginTop:53,}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={inCRUDevent.theFrame}>
              <View style={ForEventMenu.imageContainer}>
                <TouchableOpacity onPress={selectImage}>
                  <Image source={{ uri: newImageSource }} style={styles.theImage} />
                </TouchableOpacity>
              </View>
              <TxtInputs 
                // placeholder={event.eventName}
                label='Event Name'
                placeholder='Input new data... '
                value={newEventName}
                onChangeText={text => setNewEventName(text)}
              />
              
              <DatePicker onDateChange={handleDateChange} value={newDate}/>

              <TxtInputs 
                // placeholder={event.location}
                label='Location'
                placeholder='Input new data... '
                value={newLocation}
                onChangeText={text => setNewLocation(text)}
              />
              <TxtInputs 
                // placeholder={event.description}
                label='Description'
                placeholder='Input new data... '
                value={newDescription}
                onChangeText={text => setNewDescription(text)}
              />
              
          </View>
          
          
        </ScrollView>
        <TouchableOpacity onPress={handleUpdateEvent}>
                <Text style={styles.btnUpdate}>  Update Event  </Text>
              </TouchableOpacity>
      </LinearGradient>
    )
}

const styles = StyleSheet.create({

  btnUpdate:{
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
    color:'#353535',
    padding: 10,
    // borderWidth:0.5,
    marginVertical:10,
    textAlign:'center',
    fontWeight:'500',
    width:135,
    alignSelf: 'center',
  },

  theImage: {
    alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 2,
    width: '100%', 
    height: 200,
  },  

})

export const DeleteTheEvent = () => {
  const [toEdit, setToEdit] = useState(true);

  const route = useRoute();
  const { event} = route.params;
  const navigation = useNavigation();

  const handleDeleteEvent = async() => {
    const q = query(collection(db, 'newevent'), where('eventName', '==', event.eventName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      if (doc.exists) {
        const eventId = doc.id;
        await deleteDoc(doc.ref);
        console.log(`Deleted document with ID: ${eventId}`);
        navigation.navigate('EventMenuPage')
      }
    });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Warning',
      `Are you sure you want to delete the event "${event.eventName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDeleteEvent,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{margin:10, alignItems:'flex-end'}}>
    
      <TouchableOpacity onPress={confirmDelete}> 
        <MaterialIcons name="delete" size={25} color='#353535' marginRight={5} />
      </TouchableOpacity>
      
    </View>
  )
}


const TxtInputs = ({ placeholder, value, onChangeText, label }) => {
  return (
    <View>
      <Text style={ForEventMenu.addEventLabels}>{label}</Text>
      <TextInput
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={ForEventMenu.inputBox}
        color='#f1f1f1'
        placeholderTextColor='#ABABAB'
      />
    </View>
  );
}

export default CRUDevent

