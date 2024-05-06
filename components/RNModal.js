import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Feather} from '@expo/vector-icons';

import { ForEventMenu } from '../screens/AfterAuth/InsideMenus/InsideGStyles';

export const Example = () => {
  const [visibleModal, setVisibleModal] = useState(null);


  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={ForEventMenu.addEventLabels}> Edit Profile </Text>
        <TouchableOpacity>
          <Image source={require('../assets/icon.png')} style={styles.image} />
        </TouchableOpacity>
        <Text style={{marginTop:5, color:'#ABABAB', fontSize:12}}> Tap to Edit </Text>
      </View>
      <TxtInputs label='Username' placeholder='Input new username..' />
      <TxtInputs label='Organization' placeholder='Add or input new org..' />

      <View style={styles.buttonFlex}>
        
        <TouchableOpacity onPress={() => setVisibleModal(null)}>
          <View >
            <Text style={styles.buttonCancel}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View >
            <Text style={styles.buttonSave}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>

      
    </View>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisibleModal(1)}>
            <Feather name="edit" size={20} color="#f1f1f1" marginLeft={60}/> 
        </TouchableOpacity>
        
        <Modal
          isVisible={visibleModal === 1}
          style={styles.bottomModal}
        >
          {renderModalContent()}
        </Modal>
    </View>
  );
}

const TxtInputs = ({ placeholder, value, onChangeText, label }) => {
  return (
    <View>
      <Text style={styles.editLabels}>{label}</Text>
      <TextInput
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={ForEventMenu.inputBox}
        color='#f1f1f1'
        placeholderTextColor='#ABABAB'
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },

  image: {
    // alignSelf:'center',
    resizeMode: 'cover',
    borderRadius: 50,
    width: 85, 
    height: 85,
  },  
  buttonFlex:{
    flexDirection:'row',
    justifyContent:'center',
    paddingHorizontal:10,
    marginVertical:10,
  },


  buttonSave: {
    backgroundColor: '#f1f1f1',
    color:'#6155e5',
    padding: 10, 
    margin: 10,
    textAlign: 'center',
    width:160, 
    fontSize:15,
    borderRadius: 5, 
  },

  buttonCancel:{
    backgroundColor: '#252525',
    color:'#6155e5',
    padding: 10, 
    margin: 10,
    textAlign: 'center',
    width:160, 
    fontSize:15,
    borderWidth:0.2,
    borderColor:'#6155e5',
    borderRadius: 5, 
  },
  editLabels:{
    color:'#f1f1f1',
    fontSize:13,
    fontWeight:'500',
    marginLeft:5,
    marginVertical:10,
  },

  modalContent: {
    backgroundColor: 'rgba(25, 25, 25,1)',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default Example;
