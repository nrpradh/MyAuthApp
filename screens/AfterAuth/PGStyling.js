import { StyleSheet } from 'react-native';

export const PGStyling = StyleSheet.create ({
    forContainer :{
        // marginTop:40,
        // flex:1,
    },
    pageTitle:{
        color:'#E4D4F1',
        textAlign:'center',
        fontSize:18,
        fontWeight:'500',
        
    },


    // for profile.js
    
    profileDetail:{
        flexDirection: 'row',
        // backgroundColor: '#353535',
        padding: 14,
        // marginTop:20, 
        marginBottom:5,
        alignItems: 'center',

        borderWidth:0.5,
        borderColor:'#E4D4F1',
        borderRadius:5,
       

    },
    username:{
        color: '#f1f1f1',
        // marginTop: 2,
        marginLeft: 20,
        fontSize: 17,
        
    },
    org:{
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 1,
        marginLeft: 20,
        fontSize: 13,
        // marginTop:5
    },
    email:{
        color: 'rgba(255, 255, 255, 0.5)',
        paddingBottom: 2,
        marginLeft: 20,
        fontSize: 12,
        // marginTop:5
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
    
    linearGradient: {  // Global Screen Gradient ['#f1f1f1', 'lightblue', '#353535']
        flex:1,
        colors: ['#321C43', '#321C43'],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
    },



})