import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';

const ViewAllProp = ({ toWhere }) => {

  return (
    <TouchableOpacity onPress={toWhere}>
      <View style={styles.container}>
        <Text style={styles.viewAll}> View more </Text>
        <Feather name="arrow-up-right" size={16} color="#9A92A1" style={styles.icon} />
      </View>
    </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal:3,
  },
  viewAll: {
    color: '#9A92A1',
    marginVertical: 5, 
    textAlign: 'center',
    fontSize: 13,
  },
  icon: {
    marginLeft: 2,
    marginTop: 2,
  },
});


export default ViewAllProp;




