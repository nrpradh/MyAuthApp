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
        marginLeft:5,
        marginVertical:10,
    },
    inputBox: {
        backgroundColor: '#353535',
        borderRadius: 5,
        borderColor: '#6155e5',
        borderWidth: 0.5,
        padding: 10,
        marginHorizontal: 2,
        marginBottom:15,
    },




})


export const ForManageEvent = StyleSheet.create ({

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
        backgroundColor:'#353535',
        borderWidth:0.5,
        borderColor:'#6155e5',
        padding:8,
        margin:10,
        borderRadius:2,
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 3,
        width: 300, // Adjusted width to fit two items per row
        height: 180,
    },
    textContainer: {
        padding:15,
        // flex: 1, // Take remaining space beside the image
        marginRight: 22, // Add some spacing between image and text
        // justifyContent: 'center', // Center text vertically
    },
    eventName: {
        fontSize:16,
        fontWeight:'500',
        color:'#f1f1f1',
        // marginHorizontal:3,
        marginVertical:5,
        // textAlign: 'center',
        // marginTop: 5,
    },
    location: {
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
        backgroundColor: '#353535',
        padding: 10,
        marginVertical:5,
        borderWidth:0.5,
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