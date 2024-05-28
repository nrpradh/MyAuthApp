import { StyleSheet } from 'react-native';

export const authGStyles = StyleSheet.create ({


    inputAuth:{
        borderBottomWidth:0.7,
        borderColor:'#EADDF3',
        borderRadius:5,
        padding:10,
        marginVertical:5,

    },
    boxesAuth:{
        // backgroundColor:'#EADDF3',
        padding:20,
        borderWidth:0.5,
        borderColor:'#EADDF3',
        height:300,
        borderRadius:5,
        justifyContent:'space-evenly'
    },

    btnAuth:{
        backgroundColor:'#EADDF3',
        padding:10,
        borderRadius:5,
        textAlign:'center',
        color:'#321C43',
        fontWeight:'500',
        fontSize:15
    },
    headingAuth: {
        color:'#EADDF3',
        // backgroundColor:'rgba(255, 255, 255, 0.3)',
        // padding:10,
        // alignSelf:'center',
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold'
    },
    subHeadingAuth:{ 
        color:'rgba(234, 221, 243, 0.7)',
        textAlign:'center',
        fontSize:16,
        marginTop:8,
        marginBottom:20,
        // margin:10,

    },
    switchAuth: {
   
        textAlign:'center',
        fontSize:13,    
        color:'#EADDF3',
        paddingVertical:10,
        paddingHorizontal:5,
        // marginBottom:65,
      
  
    }



})