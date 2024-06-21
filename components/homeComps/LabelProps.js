import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoryLabels = ({ nameLabel, locLabel }) => {
  return (
    <View style={styles.textMargin}>
      <Text style={[styles.txtName, { marginTop: 5 }]}>{nameLabel}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
        <Ionicons name="location-outline" size={14} color="#E4D4F1" marginRight={4} />
        <Text style={styles.txtLocation}>{locLabel}</Text>
      </View>
    </View>
  );
};

const ThisMonthLabels = ({ nameLabel, locLabel, dateLabel }) => {
  return (
    <View style={styles.textMargin}>
      <Text style={styles.txtName}>{nameLabel}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 'auto', marginTop: 5 }}>
        <Ionicons name="location-outline" size={14} color="#E4D4F1" marginRight={4} />
        <Text style={styles.txtLocation}>{locLabel}</Text>
      </View>
      <Text style={{ color: 'lightgrey', fontSize: 12.3 }}>{dateLabel}</Text>
    </View>
  );
};

const CreatorTag = ({ profilePic, nameLabel, orgLabel }) => {
  return (
    <View style={creatorStyles.container}>
      <Image  source={{ uri:profilePic}} style={creatorStyles.image} />
      <View style={{flexDirection:'column'}}>
        <Text style={creatorStyles.userName}>{nameLabel}</Text>
        <Text style={creatorStyles.userOrg}>{orgLabel}</Text>
      </View>
    </View>
  );
};


export { CategoryLabels, ThisMonthLabels, CreatorTag };

const creatorStyles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    // paddingVertical:5,
    // paddingHorizontal:8,
    margin:10,
    // borderWidth:0.5,
    // borderColor:'#E4D4F1',
    // borderRadius:5,  
  },
  
  image: {
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth:5,
    margin:5,
    width: 55, 
    height: 55,
  },  
  userName :{
    marginHorizontal:10,
    // fontSize:16,
    color:'#f1f1f1',
  },

  userOrg :{
    marginHorizontal:10,
    fontSize:12,
    color:'rgba(230, 231, 230, 0.8)',
  }
})

const styles = StyleSheet.create({
  textMargin: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  txtName: {
    color: '#f1f1f1',
    fontWeight: '500',
  },
  txtLocation: {
    color: '#e4d4f1',
    fontSize: 13,
  },
});
