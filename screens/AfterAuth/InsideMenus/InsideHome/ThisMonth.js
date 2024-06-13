import { View, Text, StyleSheet, Image, RefreshControl, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ThisMonth = () => {
  return (
    <View style={{padding:8, marginTop:5}}>
      <Text style={styles.h1}>This Month</Text>
      
    </View>
  )
}

export default ThisMonth

const styles = StyleSheet.create({
    h1 : {
        // marginTop:15,
        color:'#f1f1f1',
        fontSize:18,
        fontWeight:'500',
        marginVertical:6,
    },



})