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
  const [authChecked, setAuthChecked] = useState(false); // Auth tracking

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setAuthChecked(true);
      } else {
        setUser(null);
        setAuthChecked(true); 
      }
    });
  }, []);
  
  if (!authChecked) {
    console.log("Authentication check is not complete yet...");
    return null; 
  }

  return (
    <LinearGradient {...PGStyling.linearGradient} style={styles.container}>
      <View style={styles.container}>
        {user ? <TabNav /> : (isRegistering ? <Register /> : <Login />)}
        {user ? null : (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {isRegistering ? (
              <Text style={authGStyles.switchAuth}>Already have an account?</Text>
            ) : (
              <Text style={authGStyles.switchAuth}>Don't have an account?</Text>
            )}
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
    },
    switchAuth:{
      fontSize:13,
      color:'rgba(234, 221, 243, 0.7)',
      textAlign:'center',
      textDecorationLine:'underline',
      paddingVertical:10,
     
    }

})
