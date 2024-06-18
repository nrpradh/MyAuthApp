import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; ;
import { getAuth, signOut } from 'firebase/auth';

const LogOut = () => {
  const navigation = useNavigation(); 
  const auth = getAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      navigation.navigate('LandingPage');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: handleLogout
        }
      ]
    );
  };

  return (
    <View style={styles.logOutPos}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#F72F31" />
      ) : (
        <TouchableOpacity onPress={confirmLogout}>
          <View style={styles.theBtn}>
            <Feather name='log-out' size={18} color="#F72F31" />
            <Text style={styles.logOutOnly}> Log Out </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    logOutPos:{
      // width:150,
      // backgroundColor:'blue',
      // flex:1,
      // paddingHorizontal:10,
      alignItems:'flex-end',
      justifyContent:'flex-end'
    },
    theBtn: {
      flexDirection: 'row',
      alignItems:'center',
      borderRadius: 5,
      backgroundColor: '#f1f1f1',
      padding: 10,
      // marginRight:5,
      marginVertical:5,
      
    },
    

    logOutOnly:{
        color: '#F72F31',
        // paddingTop: 2,
        marginLeft: 10,
        // fontSize: 16,
      },
      logOutSubOnly: {
        color: 'rgba(155, 8, 13, 0.65)',
        // paddingBottom: 2,
        marginLeft: 17,
        fontSize: 11,
    },        
})
export default LogOut;
