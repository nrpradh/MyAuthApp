import { StyleSheet, Text, View, TextInput, ScrollView, Linking, Alert, Platform, TouchableOpacity, Image,} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, {useState} from 'react'

import { PGStyling } from '../../PGStyling'
import { ForEventMenu, ForManageEvent } from '../InsideGStyles'

const CRUDevent = ({route}) => {
    const [updateEvent, setUpdateEvent] = useState([]);
    const { event } = route.params;

    return (
        <LinearGradient {...PGStyling.linearGradient} style={ForEventMenu.screenLayout}>
            <View style={PGStyling.forContainer}>
                <Text>CRUDevent</Text>
                <Image source={{ uri: event.imageSource }} style={styles.image} />
                <Text>{event.eventName}</Text>
                <Text>{event.location}</Text>
                <Text>{event.selectedDate}</Text>
            </View>
        </LinearGradient>
    )
}

export default CRUDevent

const styles = StyleSheet.create({
    image: {
        alignSelf:'center',
        resizeMode: 'cover',
        borderRadius: 2,
        width: '100%', 
        height: 135,
      },  


})