import { StyleSheet } from 'react-native';

export const ForEventMenu = StyleSheet.create ({
    screenLayout: {
        flex:1,
        padding:10,
    },
    theFrame: {
        backgroundColor:'rgba(25, 25, 25, 0.7)',
        // height:250,
        padding:5,
        borderRadius:5,  
        marginTop:5,
        // marginBottom:-20
        // flex:1,
        // marginVertical:10,
    
    },
    eventFlex:{
        // flexGrow:1,
        margin:5,
        alignItems:'center',
        // marginHorizontal:2,
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
    
    

    // Add Image Styling
    inputBox: {
        backgroundColor: '#353535',
        borderRadius: 5,
        borderColor: '#6155e5',
        borderWidth: 0.5,
        padding: 10,
        marginHorizontal: 2,
        marginBottom:15,
    },
    addEventLabels:{
        color:'#f1f1f1',
        fontSize:15,
        fontWeight:'500',
        marginLeft:5,
        marginVertical:10,
    },
    imageContainer: {
        // flexDirection: 'row', // Arrange image and text horizontally
        backgroundColor:'#353535',
        borderWidth:0.5,
        borderColor:'#6155e5',
        // padding:8,
        margin:1,
        marginTop:5,
        borderRadius:2,
    },
    addImageCont: {
        // marginTop: 20,
        alignItems: 'center',
        padding: 20,
    },
    imageSize: {    
        borderRadius:5,
        width: 370,
        height: 200,
        
    }




})
export const inCRUDevent = StyleSheet.create ({ 

    theFrame: {
        backgroundColor:'rgba(25, 25, 25, 0.7)',
        padding:10,
        // minHeight: '90%',
        borderRadius:5,  
        marginTop:20,
        // flex:1,
        // marginVertical:10,
    
    },

    // Labels
    eventName: {
        fontSize:17,
        fontWeight:'500',
        color:'#f1f1f1',
        marginHorizontal:5,
        // marginTop:10,
        // paddingTop: 5,
        // marginBottom:5,
        // textAlign: 'center',
        
    },
    
    anotherTxt : { 

        color:'rgba(255, 255, 255, 0.8)',
        marginHorizontal:5,
        marginVertical:1
        
    },

    

})

export const ForManageEvent = StyleSheet.create ({
    forContainer :{
        // marginTop:40,
        flex:1,
        flexGrow:1,
    },
    eventList: {
        // flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemContainer: {
        paddingVertical: 18,
        paddingHorizontal: 17,
        backgroundColor:'rgba(244, 244, 244, 0.2)',
        borderRadius: 1.5,
        // marginRight: 10,
        marginBottom: 10,
        // height: 200, // Adjusted height for better visibility
        // width: '45%', // Adjusted width to fit two items per row
    },
    imageContainer: {
        // flexDirection: 'row', // Arrange image and text horizontally
        // backgroundColor:'#353535',
        borderWidth:0.6,
        borderColor:'#6155e5',
        padding:10,
        marginBottom:10, //marginTop:2,
        marginHorizontal:5,
        borderRadius:2,
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 3,
        width: 300, // Adjusted width to fit two items per row
        height: 180,
    },
    textContainer: {
        // paddingHorizontal:15,
        paddingVertical:10,
        // flex: 1, // Take remaining space beside the image
        marginHorizontal: 5, 
        // justifyContent: 'center', // Center text vertically
    },
    eventName: {
        fontSize:16,
        fontWeight:'500',
        color:'#f1f1f1',
        // marginHorizontal:3,
        // marginVertical:5,
        // textAlign: 'center',
        // paddingTop: 5,
    },
    location: {
        fontSize:13,
        color:'lightgrey'
    },
    dTime: {
        margin:2,
        color:'lightgrey',
        fontSize:13,
    }


    
})
export const ForProfile = StyleSheet.create ({
    profileContent: {
        flexDirection: 'row',
        borderRadius: 5,
        // backgroundColor: '#353535',
        padding: 10,
        marginVertical:5,
        borderWidth:0.5,
        borderColor:'#6155E5',
        // width: '95%',
        alignItems: 'center',
        // marginBottom: 10,
    },
    editProfileTitle:{
        color:'#353535',
        textAlign:'center',
        fontSize:18,
        fontWeight:'500',
        marginBottom:15,
        
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
        marginVertical:5,
    },
    headerFrame:{
        color:'#f1f1f1',
        fontSize:18,
        fontWeight:'500',
        marginVertical:6,
    }

})