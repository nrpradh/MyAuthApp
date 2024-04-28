import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

// Auth Pages
import Register from './Register'
import Login from './Login'

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Landing Page</Text>
      <View>
        <Button 
            title='Register'
            onPress={() => navigation.navigate('RegisterPage')}/>
        <Button 
            title='Login'
            onPress={() => navigation.navigate('LoginPage')}/>
            
       
      </View>
    </View>
  )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#709065',
    }

})