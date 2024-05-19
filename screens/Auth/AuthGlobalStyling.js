import { StyleSheet } from 'react-native';

export const authGStyles = StyleSheet.create ({


    inputAuth:{
        borderBottomWidth:0.7,
        borderColor:'#f1f1f1',
        borderRadius:5,
        padding:10,
        marginVertical:5,

    },
    boxesAuth:{
        backgroundColor:'#353535',
        padding:20,
        height:300,
        borderRadius:5,
        justifyContent:'space-evenly'
    },

    btnAuth:{
        backgroundColor:'#f1f1f1',
        padding:10,
        borderRadius:5,
        textAlign:'center',
        color:'#353535'
    },
    headingAuth: {
        color:'#353535',
        // backgroundColor:'rgba(255, 255, 255, 0.3)',
        // padding:10,
        // alignSelf:'center',
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold'
    },
    subHeadingAuth:{ 
        color:'grey',
        textAlign:'center',
        fontSize:16,
        marginTop:8,
        marginBottom:20,
        // margin:10,

    },
    switchAuth: {
   
        textAlign:'center',
        fontSize:13,    
        color:'#353535',
        paddingVertical:10,
        paddingHorizontal:5,
        // marginBottom:65,
      
  
    }



})