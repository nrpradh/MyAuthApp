import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React,{useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

// Directory imports
import { auth } from '../../../firebaseAPI';
import { PGStyling } from '../PGStyling';
import {collection, db,doc, getDocs, query,where, onSnapshot } from '../../../firebaseAPI';

// Components
import LogOut from '../InsideMenus/logOut';
import BtnForProfile from '../InsideMenus/InsideProfile/btnForProfile'
import { ForProfile } from '../InsideMenus/InsideGStyles';
import IconEditProfile from '../../../components/IconEditProfile';

const Profile = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState('');
  // const [profilePic, setProfilePic] = useState(userData.profilePic);
  
  const fetchUserData = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userProfileCollectionRef = collection(db, 'userprofile');
      const userQuery = query(userProfileCollectionRef, where('uid', '==', currentUser.uid));

      const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setRefreshing(false);
        });
      }, (error) => {
        console.error('Error fetching user data:', error);
      });

      return unsubscribe;
      }
  };

  useEffect(() => {
    const unsubscribe = fetchUserData();
    return unsubscribe;
  }, []);
  
  const onRefresh = () => {
    fetchUserData();
  };
  

  // const MyID = auth.currentUser.email
  // const user = auth.currentUser
  
  
  
  
  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container} >
      <ScrollView 
        style={PGStyling.forContainer}
        contentContainerStyle={{flexGrow:1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#321c43']} // Android)
            tintColor={'#321c43'} // iOS)
          />
        }
      >
   
        <View style={PGStyling.profileDetail}>
          {/* <Image source={{uri : userData.profilePic}} style={styles.image}/> */}
          <Image  source={userData? { uri: userData.profilePic } : require('../../../assets/icon.png')}
                  style={styles.image} />
          {userData && (

            <View>
              <Text style={PGStyling.username}> {userData.username}  </Text>
              <Text style={PGStyling.org}>  {userData.organization} </Text>
              <Text style={PGStyling.email}>  {userData.email} </Text>
              
            </View>
          )}
          <IconEditProfile userData={userData} />
          
        </View>
        
      
      
        <View style={ForProfile.proFrame}>
          <Text style={ForProfile.headerFrame} > Preferences </Text>
          <BtnForProfile 
            icon={<Feather name="book-open" size={22} color="#f1f1f1" marginLeft={5}  />}
            headText="Terms of use"
            subHeading="User guidelines, rights, agreements, etc."
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <BtnForProfile 
            icon={<Feather name="help-circle" size={25} color="#f1f1f1" marginLeft={2} />}
            headText="About"
            subHeading="About the app and etc."
            onPress={() => navigation.navigate('EventLogsPage')}
          />
          <BtnForProfile 
            icon={<MaterialCommunityIcons name="comment-question-outline" size={22} color="#f1f1f1" marginLeft={5}  />}
            headText="FAQ"
            subHeading="Frequently asked question"
            onPress={() => navigation.navigate('HomeScreen')}
          /> 
          
          
          
          
        </View>
        <LogOut/>
      </ScrollView>
    
      
    </LinearGradient>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },
  image: {
    // alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth:0.5, 
    borderColor:'#EADDF3',
    width: 75, 
    height: 75,
  },  

})