import { StyleSheet, Text, View,TouchableOpacity, Animated, } from 'react-native'
import React,{useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { authGStyles } from './AuthGlobalStyling';
import { PGStyling } from '../AfterAuth/PGStyling';

import { auth } from '../../firebaseAPI';
import { onAuthStateChanged } from 'firebase/auth';

// Auth Pages
import Register from './Register'
import Login from './Login'
import TabNav from '../../navigations/TabNav';

const Landing = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // Track if authentication is checked

  const userLog = auth.currentUser;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setAuthChecked(true); // Set to true after authentication check
      } else {
        setUser(null);
        setAuthChecked(true); // Set to true after authentication check
      }
    });
  }, []);
  
  // Wait for authentication check before rendering
  if (!authChecked) {
    console.log("Authentication check is not complete yet...");
    return null; // You can render a loading spinner or placeholder here
  }

  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container}>
      <View style={styles.container}>
        {/* Conditional rendering based on authentication state */}
        {user ? <TabNav /> : (isRegistering ? <Register /> : <Login />)}

        {/* Conditional label based on isRegistering */}
        {user ? null : (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {isRegistering ? (
              // If registering, show "already have an account?" label
              <Text style={authGStyles.switchAuth}>Already have an account?</Text>
            ) : (
              // If not registering, show "don't have an account?" label
              <Text style={authGStyles.switchAuth}>Don't have an account?</Text>
            )}

            {/* Touchable to switch between login and signup */}
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text style={styles.switchAuth}>
                {isRegistering ? 'Log in' : 'Sign up'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default Landing

const styles = StyleSheet.create({
    container: {
        flex:10,
        justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#709065',
        // margin:10,
    },
    switchAuth:{
      fontSize:13,
      color:'rgba(234, 221, 243, 0.7)',
      textAlign:'center',
      textDecorationLine:'underline',
      paddingVertical:10,
      // paddingHorizontal:5,
      // position:'absolute',
      // bottom:229, 
      // right:108,
    }

})