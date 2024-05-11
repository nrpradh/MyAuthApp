import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity, Image,} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, {useState} from 'react'

import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent, inCRUDevent } from '../InsideGStyles'

const CRUDevent = ({route}) => {
    const { event } = route.params;
    const [updateEvent, setUpdateEvent] = useState('');
    const [location, setLocation] = useState(event.location);
    

    const openMaps = () => {
        const formattedAddress = location.replace(/\s/g, '+');
        let url;
      
        // Check the platform and generate the appropriate URL
        if (Platform.OS === 'android') {
          url = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        } else if (Platform.OS === 'ios') {
          url = `http://maps.apple.com/?q=${formattedAddress}`;
        } else {
          console.warn('Unsupported platform');
          return;
        }
      
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
      };
    
      const handleAddressPress = () => {
        if  (location) {
            // console.log("Formatted Address:", formattedAddress);
            // console.log("URL:", url);
            openMaps();
        }   else {
            console.warn('Location is not provided');
        }
      };



    return (
        <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
            <View style={PGStyling.forContainer}>
                <Text style={styles.eventEdit}>Edit Event</Text>
                <View style={inCRUDevent.theFrame}>
                    <Image source={{ uri: event.imageSource }} style={styles.image} />
                    <Text style={inCRUDevent.eventName}>{event.eventName}</Text>
                    <TouchableOpacity onPress={handleAddressPress}>
                        <Text style={[
                            inCRUDevent.anotherTxt, 
                            {   textDecorationLine:'underline',
                                marginVertical:5,
                            }]}>{event.location}</Text>
                    </TouchableOpacity>
                    <Text style={inCRUDevent.anotherTxt}>{event.selectedDate}</Text>
                    <TouchableOpacity>
                        <Text style={inCRUDevent.anotherTxt}>{event.description}</Text>
                    </TouchableOpacity>    
                </View>
            </View>
        </LinearGradient>
    )
}

export default CRUDevent

const styles = StyleSheet.create({
    eventEdit:{
        color:'#353535',
        textAlign:'center',
        fontSize:18,
        fontWeight:'500',
        marginHorizontal:4,
        // marginTop:40
    },

    image: {
        
        alignSelf:'center',
        resizeMode: 'cover',
        borderRadius: 2,
        width: '100%', 
        height: 200,
      },  


})