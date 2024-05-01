import { StyleSheet } from 'react-native';

export const ForEventMenu = StyleSheet.create ({
    screenLayout: {
        flex:1,
        padding:10,
    },
    theFrame: {
        backgroundColor:'rgba(25, 25, 25, 0.7)',
        padding:10,
        minHeight: '92.5%',
        borderRadius:5,  
        marginTop:10,
    
    },
    eventFlex:{
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:2,
        // backgroundColor:'white'

    },
    eventHeading:{ 
        color:'#353535',
        // textAlign:'center',
        fontSize:18,
        fontWeight:'500',
        marginHorizontal:4,
        // marginTop:,
        // marginBottom:15,
        // margin:10,

    },
    textGuide:{
        
        // marginTop:3,
        // marginBottom:10,
        color:'grey',
        fontSize:12,
        // textAlign:'center'
    },
    addEventLabels:{
        color:'#f1f1f1',
        fontSize:15,
        fontWeight:'500',
        // marginLeft:3,
        marginVertical:10,
    }




})

export const ForProfile = StyleSheet.create ({
    profileContent: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#353535',
        padding: 10,
        marginVertical:5,
        borderWidth:1,
        borderColor:'#6155E5',
        // width: '95%',
        alignItems: 'center',
        // marginBottom: 10,
    },
    editText: {
        color: '#f1f1f1',
        paddingTop: 2,
        marginLeft: 20,
        fontSize: 16,
    },
    editSubText: {
        color: 'rgba(255, 255, 255, 0.7)',
        paddingBottom: 2,
        marginLeft: 20,
        fontSize: 11,
    },
    proFrame: {
        backgroundColor:'rgba(25, 25, 25, 0.7)', //rgba(25, 25, 25, 0.25)
        padding:10,
        borderRadius:5,  
        marginBottom:10,
    },
    headerFrame:{
        color:'#f1f1f1',
        fontSize:18,
        fontWeight:'500',
        marginVertical:6,
    }

})