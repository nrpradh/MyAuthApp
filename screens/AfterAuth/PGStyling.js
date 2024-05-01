import { StyleSheet } from 'react-native';

export const PGStyling = StyleSheet.create ({
    forContainer :{
        marginTop:50,
        // flex:1,
    },
    profileContent: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        padding: 10,
        // width: '95%',
        alignItems: 'center',
        // marginBottom: 10,
    },
    
    linearGradient: {
        flex:1,
        colors: ['#f1f1f1', '#6155e5', '#353535'],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
    },



})