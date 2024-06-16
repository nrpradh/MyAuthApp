import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CatLabelsProp = ({nameLabel, locLabel}) => {
    return (
      <View style={styles.textMargin}>
          <Text style={styles.txtName}>{nameLabel}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Ionicons name="location-outline" size={14} color="#E4D4F1" marginRight={4} />
              <Text style={styles.txtLocation}>{locLabel}</Text>
              
          </View> 
          
      </View>
    );
  };
  
  export default CatLabelsProp;
  const styles = StyleSheet.create({
    textMargin: {
        padding: 10,
        // justifyContent:'space-between',

    },
    txtName : {
        // marginTop:5,
        color: '#f1f1f1',
        fontWeight: '500',
    },
  

    txtLocation : {
        // marginVertical:5,
        color:'lightgrey',
        fontSize:13,
    }
})