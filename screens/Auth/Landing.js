import { StyleSheet, Text, View, Button } from 'react-native'
import React,{useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';

// Auth Pages
import Register from './Register'
import Login from './Login'
import Home from '../AfterAuth/Home'

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
        <Button
          title={isRegistering ? 'Switch to Login' : 'Switch to Register'}
          onPress={() => setIsRegistering(prevState => !prevState)}
        />
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
    }

})