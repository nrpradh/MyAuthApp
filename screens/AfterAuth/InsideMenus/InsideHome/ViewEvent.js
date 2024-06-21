import { StyleSheet, Text, View, ScrollView, Share, Linking, FlatList, Platform, TouchableOpacity, Image,} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react'
import { MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons';


import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent, inCRUDevent } from '../InsideGStyles'
import { CreatorTag } from '../../../../components/homeComps/LabelProps';


const ViewEvent = ({route}) => {
    const { event, eventCreatorProfile } = route.params;
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

    return (
    <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={inCRUDevent.theFrame}>
            <Image source={{ uri: event.imageSource }} style={styles.image} />
            <View style={styles.nameWDate}>
              <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:5}}>
                <Ionicons name="location-outline" size={18} color="#E4D4F1" />
                <TouchableOpacity onPress={openMaps}>
                  <Text style={[
                      inCRUDevent.anotherTxt, 
                      {   textDecorationLine:'underline',
                            // marginTop:6,
                          
                      }]}>{event.location}</Text>
                </TouchableOpacity>
                
              </View>
              <Text style={inCRUDevent.anotherTxt}>{event.selectedDate}</Text>
            </View>
            
            <DescriptionWithInstagramLinks description={event.description} />
            <FlatList
              data={event.category}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.categoryBox}>
                  <Octicons name="dot-fill" size={19} color="#321c43" marginRight={7} />
                  <Text style={styles.categoryText}>{item}</Text>
                </View>
              )}
            />
            
          </View>
        <Text style={{
          marginTop:20,
          marginLeft:5,
          color:'#EADDF3',
          fontSize:15,
          fontWeight:'500'
          }}>Created by</Text>  
        <CreatorTag 
          profilePic={eventCreatorProfile.profilePic}
          nameLabel={eventCreatorProfile.username}
          orgLabel={eventCreatorProfile.organization} />
          
      </ScrollView>
    </LinearGradient>
      
    )
}

export const ShareEvent = ({ event }) => {
  const handleShare = async () => {
    try {
      const deepLink = `eventour://event-details/${event.id}`;
  
      const message = `${event.eventName}\n${event.selectedDate}\nLocation: ${event.location}\n\nEvent Details: ${deepLink}`;

      await Share.share({
        message,
        url: event.imageSource, 
      });
  
    } catch (error) {
      console.error('Error sharing event:', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name="share-social-outline" size={24} color="#E4D4F1" style={{ marginRight: 15}} />
    </TouchableOpacity>
  );
};




export default ViewEvent;



const styles = StyleSheet.create({
    showCategories :{
      flexDirection:'row',
      // backgroundColor:'#f1f1f1',
      borderRadius:20,
      // marginHorizontal:5,
      marginVertical:2,
      marginHorizontal:7,
    },
    
    categoryBox: {
      flexDirection:'row',
      flexWrap:'wrap',
      alignItems:'center',
      backgroundColor: '#f1f1f1',
      borderWidth:0.5,
      paddingVertical: 5,
      paddingHorizontal:10,
      marginLeft: 6,
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
      marginTop:15,
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
        margin:8,
        // padding:8,
        alignItems:'center'
        
        
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