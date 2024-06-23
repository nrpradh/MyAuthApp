import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal  from 'react-native-modal';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import { ForProfile } from '../../screens/AfterAuth/InsideMenus/InsideGStyles';

const ProfileComponent = ({ icon, subHeading, onPress, content, preref }) => {
  const [isModalVisible, setModalVisible] = useState(false);


  const renderModalContent = () => ( 
    <View style={{ backgroundColor: 'rgba(50, 28, 67,0.65)', padding: 22 }}>
      <Text style={{color:'#f1f1f1', textAlign:'center', fontSize:16, marginBottom:20}}> {preref} </Text>
      <Text style={{color:'#f1f1f1', }}>{content}</Text>
      <TouchableOpacity onPress={() => setModalVisible(null)} >
        <Text style={{color:'#EADDF3', textAlign:'center', marginTop:20}}>Close </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={ForProfile.profileContent}>
          {icon}
          <View style={{ flexDirection: 'column' }}>
            <Text style={ForProfile.editText}>{preref}</Text>
            <Text style={ForProfile.editSubText}>{subHeading}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal 
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        isVisible={isModalVisible} 
        onBackdropPress={() => setModalVisible(null)}
        >
        {renderModalContent()} 
      </Modal>
    </View>
  );
};

export default ProfileComponent;
