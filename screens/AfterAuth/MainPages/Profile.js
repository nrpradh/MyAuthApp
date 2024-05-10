import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React,{useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

// Directory imports
import { auth } from '../../../firebaseAPI';
import { PGStyling } from '../PGStyling';
import {collection, db,doc, getDocs, query } from '../../../firebaseAPI';

// Components
import LogOut from '../InsideMenus/logOut';
import BtnForProfile from '../InsideMenus/InsideProfile/btnForProfile'
import { ForProfile } from '../InsideMenus/InsideGStyles';
import RNModal from '../../../components/RNModal';

const Profile = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState('');
  const [organization, setOrganization] = useState('');
  
  const onRefresh = async () => {
    setRefreshing(true);
    await getUserProfile();
    setRefreshing(false);
  };
  const getUserProfile = async () => {
    try {
      // Create a query to fetch documents from the "userprofile" collection
      const userRef = query(collection(db, 'userprofile'));

      // Fetch data using the created query
      const querySnapshot = await getDocs(userRef);

      // Check if there is any document returned by the query
      if (querySnapshot.empty) {
        // If no document found, set username to empty string
        setUsername('');
        setOrganization('');
        return;
      }

      // Assuming there is only one document for each user, directly access the first document
      const userProfileDoc = querySnapshot.docs[0];

      // Get the username from the document data
      const userData = userProfileDoc.data();
      setUsername(userData.username || ''); // Make sure username is defined, fallback to empty string
      setOrganization(userData.organization || '')
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // const MyID = auth.currentUser.email
  const user = auth.currentUser
  
  
  
  
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
          <View>
            <Text style={PGStyling.username}> {username}  </Text>
            {/* <Text style={PGStyling.username}> {user.displayName}  </Text> */}
            <Text style={PGStyling.org}>  {organization} </Text>
            <Text style={PGStyling.email}>  {user.email} </Text>
            
          </View>
          <RNModal/>
          
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