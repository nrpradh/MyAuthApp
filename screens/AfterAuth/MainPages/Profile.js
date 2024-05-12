import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React,{useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

// Directory imports
import { auth } from '../../../firebaseAPI';
import { PGStyling } from '../PGStyling';
import {collection, db,doc, getDocs, query,where } from '../../../firebaseAPI';

// Components
import LogOut from '../InsideMenus/logOut';
import BtnForProfile from '../InsideMenus/InsideProfile/btnForProfile'
import { ForProfile } from '../InsideMenus/InsideGStyles';
import IconEditProfile from '../../../components/IconEditProfile';

const Profile = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);

  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');

  const fetchUserData = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userProfileCollectionRef = collection(db, 'userprofile');
      const userQuery = query(userProfileCollectionRef, where('uid', '==', currentUser.uid));

      try {
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
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
            colors={['#6155e5']} // Color of the refresh indicator (Android)
            tintColor={'#6155e5'} // Color of the refresh indicator (iOS)
          />
        }
      >
        <Text style={PGStyling.pageTitle} >Your Profile</Text>
        
        <View style={PGStyling.profileDetail}>
          <Image source={require('../../../assets/icon.png')} style={styles.image} />
          {userData && (

            <View>
              <Text style={PGStyling.username}> {userData.username}  </Text>
              <Text style={PGStyling.org}>  {userData.organization} </Text>
              <Text style={PGStyling.email}>  {userData.email} </Text>
              
            </View>
          )}
          <IconEditProfile/>
          
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
          
          <LogOut/>
          
        </View>
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
    width: 75, 
    height: 75,
  },  

})