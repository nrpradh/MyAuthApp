import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity, Image,} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';


import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent, inCRUDevent } from '../InsideGStyles'


const ViewEvent = ({route}) => {
    const { event} = route.params;
    const [ address, setAddress] = useState(event.location);

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
              <Ionicons name="location-outline" size={18} color="#E4D4F1" marginTop={6}/>
              <TouchableOpacity onPress={openMaps}>
                <Text style={[
                    inCRUDevent.anotherTxt, 
                    {   textDecorationLine:'underline',
                          marginTop:6,
                        
                    }]}>{event.location}</Text>
              </TouchableOpacity>
               
            </View>
            <DescriptionWithInstagramLinks description={event.description} />
            <View style={styles.showCategories}>
              {event.category.map((category, index) => (
                
                <View key={index} style= {styles.categoryBox }>
                  <Octicons name="dot-fill" size={19} color="#321c43" marginRight={7}/>
                  <Text style={styles.categoryText}>
                    {category}
                  </Text>
                </View>
              ))}
            </View>
            
        </View>
        {/* <View style={showUserStyles.container}>
          <Text style={{color:'#f1f1f1'}}> the user that made it</Text>
        </View> */}
        
      </View>
    </LinearGradient>
      
    )
}




export default ViewEvent;

const showUserStyles = StyleSheet.create ({
  container: {
    marginVertical:15,
    padding:10,
    borderWidth:0.5,
    borderColor:'#E4D4F1',
    borderRadius:5,  
  }
})

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
      flexDirection:'row',
      alignItems:'center',
      backgroundColor: '#f1f1f1',
      borderWidth:0.5,
      // borderColor:'#E4D4F1',
      paddingVertical: 5,
      paddingHorizontal:10,
      marginHorizontal: 4,
      borderRadius: 5,
    },
    categoryText: {
      color: '#321c43',
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
        color:'#f1f1f1',
        textAlign:'justify',

        
    },
    instagramUsername: {
        // fontSize:13,
        color: '#f1f123',
        textAlign:'justify',
       
    },
 
   
})