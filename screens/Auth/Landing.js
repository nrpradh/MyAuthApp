import { StyleSheet, Text, View, Button } from 'react-native'
import React,{useState} from 'react'

// Auth Pages
import Register from './Register'
import Login from './Login'
import Home from '../AfterAuth/Home'

const Landing = ({navigation}) => {
  const [isRegistering, setIsRegistering] = useState(true);
  return (
    <View style={styles.container}>
      {isRegistering ? <Register /> : <Login />}
      <Button
        title={isRegistering ? 'Switch to Login' : 'Switch to Register'}
        onPress={() => setIsRegistering(prevState => !prevState)}
      />
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#709065',
    }

})