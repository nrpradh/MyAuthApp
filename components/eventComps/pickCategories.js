import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { ForEventMenu } from '../../screens/AfterAuth/InsideMenus/InsideGStyles';

const PickCategories = ({
  open,
  setOpen,
  value,
  setValue,
  items,
  setItems,
  category,
  setCategory,
  theBar
  }) => {
    const handleAddDoc = async (category) => {
      if (category.length === 0) {
        console.log('No category selected.');
        return;
      }
  
      setValue(category);
      setOpen(false);
      onPress(category);
    };
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState([]);
  
  // const [items, setItems] = useState([
  //   { label: 'Tech', value: 'tech' },
  //   { label: 'Sports', value: 'sports' },
  //   { label: 'Competition', value: 'competition' },
  //   { label: 'Seminar', value: 'seminar' },
  //   { label: 'Online', value: 'online' },
  //   { label: 'Concert', value: 'concert' },
  //   { label: 'Workshop', value: 'workshop' },
  //   { label: 'Others', value: 'others' },

  // ]);

  return (
    <View style={theBar}>
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
        badgeDotColors={['#321C75']}  
        badgeColors={['#f1f1f1']}
        badgeDotStyle={{
          borderRadius: 5
        }}
        badgeStyle={{
          padding: 10,
          background: '',
          // marginRight:30,
          borderRadius:5,
          borderColor:'#E4D4F1'
        }}  
        badgeTextStyle={{
          fontSize:15,
          color:'#321c75',
        }}
        listItemLabelStyle={styles.dropdownItemLabel}
        listItemContainerStyle={styles.dropdownItemContainer}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
        placeholderStyle={{color:'rgba(234, 221, 275, 0.5)'}}
        placeholder="Pick one category or more... ( max : 4 )"
        onConfirm={() => handleAddDoc(category)}
        category={category}
        setCategory={setCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:25,
    // justifyContent: 'center',
    // alignItems: 'center',
    
  },
  dropdownContainer: {
    // width: '50%',
    height: 40,
    marginBottom: 20,
    
    
  },
  dropdown: {
    backgroundColor: '#321c75',
    // color:'#ababab',
    borderColor: '#E4D4F1',
    borderRadius:5,
    borderWidth: 0.5,
    
  },
  dropdownText: {
    
    fontSize: 14,
    color: '#ABABAB',
    
  },
  dropdownItemContainer: {
   
    backgroundColor: '#321c75',
    borderColor:'#E4D4F1', borderWidth:0.2,
  },
  dropdownItemLabel: {
    
    fontSize: 14,
    color: '#f1f1f1',
    
    
  },
  selectedItemContainer: {
    borderColor:'#E4D4F1', borderLeftWidth:4,
    backgroundColor: '#f1f1f1',
    
  },
  selectedItemLabel: {
    
    fontSize: 14,
    color: '#353535',
  },
});

export default PickCategories;
