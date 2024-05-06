import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { ForEventMenu } from '../screens/AfterAuth/InsideMenus/InsideGStyles';

const PickCategories = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  
  const [items, setItems] = useState([
    { label: 'Tech', value: 'tech' },
    { label: 'Sports', value: 'sports' },
    { label: 'Competition', value: 'competition' },
    { label: 'Seminar', value: 'seminar' },
    { label: 'Online', value: 'online' },
    { label: 'Concert', value: 'concert' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Others', value: 'others' },

  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        min={0}
        max={4}
        mode="BADGE" // Change the mode here
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        // badgeDotColors={[]}
        badgeDotColors={['#f1f1f1']}  
        badgeColors={['white']}
        badgeDotStyle={{
          borderRadius: 5
        }}
        badgeStyle={{
          padding: 10,
          // marginRight:30,
          borderRadius:20,
        }}  
        badgeTextStyle={{
          fontSize:15,
          color:'#6155e5',
          // marginRight:20,
          // padding:2
          // backgroundColor:'#353535',
        }}
        listItemLabelStyle={styles.dropdownItemLabel}
        listItemContainerStyle={styles.dropdownItemContainer}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
        placeholder="Pick one category or more..."
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    // justifyContent: 'center',
    // alignItems: 'center',
    
  },
  dropdownContainer: {
    // width: '50%',
    height: 40,
    marginBottom: 20,
    
    
  },
  dropdown: {
    backgroundColor: 'rgba(25, 25, 25, 0.7)',
    // color:'#ababab',
    borderColor: '#6155e5',
    borderRadius:5,
    borderWidth: 0.5,
    
  },
  dropdownText: {
    
    fontSize: 14,
    color: '#ABABAB',
    
  },
  dropdownItemContainer: {
   
    backgroundColor: '#353535',
    borderColor:'#6155e5', borderWidth:0.2,
  },
  dropdownItemLabel: {
    
    fontSize: 14,
    color: '#f1f1f1',
    
    
  },
  selectedItemContainer: {
    borderColor:'#6155e5', borderLeftWidth:2,
    backgroundColor: '#f1f1f1',
    
  },
  selectedItemLabel: {
    
    fontSize: 14,
    color: '#6155e5',
  },
});

export default PickCategories;
