import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import { ForProfile } from '../../screens/AfterAuth/InsideMenus/InsideGStyles';

const ProfileComponent = ({ icon, headText, subHeading, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={ForProfile.profileContent}>
        {icon}
        <View style={{ flexDirection: 'column' }}>
          <Text style={ForProfile.editText}>{headText}</Text>
          <Text style={ForProfile.editSubText}>{subHeading}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponent;
