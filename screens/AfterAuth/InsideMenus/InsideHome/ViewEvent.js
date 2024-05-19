import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity, Image,} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';


import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent, inCRUDevent } from '../InsideGStyles'


const CRUDevent = ({route}) => {
    const { event} = route.params;
    const [address, setAddress] = useState(event.location);

    const DescriptionWithInstagramLinks = ({ description }) => {
      // Split the description text into parts
      const parts = description.split(/(@[a-zA-Z0-9_]+)/g);
    
      // Directly open someone's profile
      const handleInstagramUsernameClick = (username) => {
        const instagramUrl = `https://www.instagram.com/${username}`;
        Linking.openURL(instagramUrl);
      };
    
      return (
        <View style={styles.container}>
          <Text style={styles.regularText}>
            {parts.map((part, index) => {
              if (part.startsWith('@')) {
                // This part is an Instagram username
                const username = part.slice(1); // to remove the '@' symbol
                return (
                  <Text
                    key={index}
                    style={styles.instagramUsername}
                    onPress={() => handleInstagramUsernameClick(username)}>
                    {part}
                  </Text>
                );
              } else {
                // This part is regular text
                return part;
              }
            })}
          </Text>
        </View>
      );
    };

    const openMaps = () => {
        const formattedAddress = address.replace(/\s/g, '+');
        let url;
      
        // Check the platform and generate the appropriate URL for both platforms
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
        if  (address) {
            console.log("opened address :", address);
            // console.log("URL:", url);
            openMaps();
        }   else {
            console.warn('Location is not provided');
        }
    };

     
      
      const navigation = useNavigation()

      const handleGoBack = () => {
        navigation.goBack();
      };
    return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
        <View >
          <View style={inCRUDevent.theFrame}>
            <Image source={{ uri: event.imageSource }} style={styles.image} />
            <View style={styles.nameWDate}>
              <Text style={inCRUDevent.eventName}>{event.eventName}</Text>
              <Text style={inCRUDevent.anotherTxt}>{event.selectedDate}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:5}}>
              <Ionicons name="location-outline" size={18} color="lightgrey" marginTop={6}/>
              <TouchableOpacity onPress={handleAddressPress}>
                <Text style={[
                    inCRUDevent.anotherTxt, 
                    {   textDecorationLine:'underline',
                          marginTop:6,
                        
                    }]}>{event.location}</Text>
              </TouchableOpacity>
               
            </View>
            <View style={styles.showCategories}>
              {event.category.map((category, index) => (
                <View key={index} style= {styles.categoryBox }>
                  <Text style={styles.categoryText}>
                    {category}
                  </Text>
                </View>
              ))}
            </View>
            {/* <Text style={styles.showCategories}>{event.category}</Text>  */}
            <DescriptionWithInstagramLinks description={event.description} />
            {/* <Text style={inCRUDevent.anotherTxt}>{event.description}</Text> */}
            
        </View>
        
      </View>
    </LinearGradient>
      
    )
}




export default CRUDevent

const styles = StyleSheet.create({
    showCategories :{
      flexDirection:'row',
      // backgroundColor:'#f1f1f1',
      borderRadius:20,
      // marginHorizontal:5,
      marginTop:5,
      padding:2,
    },
    
    categoryBox: {
      // backgroundColor: '#ABABAB',
      borderWidth:0.5,
      borderColor:'lightblue',
      paddingVertical: 5,
      paddingHorizontal:10,
      marginHorizontal: 4,
      borderRadius: 5,
    },
    categoryText: {
      color: 'lightblue',
      // fontSize: 18,
    },

    nameWDate: {
      flexDirection: 'row', 
      alignItems: 'center' ,
      justifyContent:'space-between',
      marginTop:10,
    },

    image: {
      alignSelf:'center',
      resizeMode: 'cover',
      borderRadius: 2,
      width: '100%', 
      height: 200,
    },  


    // for description only
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
        color:'rgba(255, 255, 255, 0.8)',
        textAlign:'justify',

        
    },
    instagramUsername: {
        // fontSize:13,
        color: '#ADD8E6',
        textAlign:'justify',
       
    },
 
   
})