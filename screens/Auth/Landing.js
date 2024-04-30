import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { authGStyles } from './AuthGlobalStyling';

// Auth Pages
import Register from './Register'
import Login from './Login'


const Landing = ({navigation}) => {
  const [isRegistering, setIsRegistering] = useState(true);
  return (
    <LinearGradient
      colors={['#f1f1f1', '#6155e5', '#353535']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}  
      style={styles.container}
    >
      <View style={styles.container}>
        {isRegistering ? <Register /> : <Login />}

        {/* Conditional label based on isRegistering */}
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
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
      </View>
    </LinearGradient>
  )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'#709065',
        // margin:10,
    },
    switchAuth:{
      fontSize:13,
      color:'lightgrey',
      textAlign:'center',
      textDecorationLine:'underline',
      paddingVertical:10,
      // paddingHorizontal:5,
      // position:'absolute',
      // bottom:229, 
      // right:108,
    }

})