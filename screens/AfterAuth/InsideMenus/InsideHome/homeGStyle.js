import { StyleSheet } from "react-native";

export const forCategories = StyleSheet.create ({
    
    // Styling categorie boxes
    categories: {
        // paddingHorizontal: 10,
    },
    categoryItem: {
        borderWidth: 1,
        borderColor: '#E4D4F1',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    categoryText: {
        color: '#E4D4F1',
        fontWeight: 'bold',
    },
    selectedCategory: {
        backgroundColor: '#E4D4F1',
    },
    selectedText: {
        color: '#f1f1f1',
    },
    flatListContent: {
        alignItems: 'center',
    },
    
    // The data container
    theFrame: {
        backgroundColor:'#353535',
        padding:15,
        width:'100%',
        // minHeight: '92.5%',
        borderRadius:5,  
        marginVertical:10,
        
    
    },
    
    noCatFrame:{
        padding:15,
        width:'100%',
        justifyContent:'center',
        height:196,
        borderWidth:0.5,
        borderColor:'#E4D4F1',
        borderRadius:5,  
        marginVertical:5,
        
    },

    catFrame:{
        backgroundColor:'#353535',
        padding:15,
        width:'100%',
        // minHeight:'50%',
        height:225,
        // minHeight: '92.5%',
        borderRadius:5,  
        marginVertical:5,
    },
    itemContainer: {
        borderWidth: 0.6,
        paddingVertical: 8,
        paddingHorizontal: 10,
        // alignItems: 'center',
        // backgroundColor: '#353535',
        borderRadius: 5,
        borderColor:'#E4D4F1',
        marginRight: 10,
        // height: 200,
        width: 230,// Adjust item width as needed
    },
    image: {
        resizeMode:'cover',
        borderRadius: 2,
        // width: '100%', // Adjust image width as needed
        height: 120, // Adjust image height as needed
    },
    overlay: {
        alignSelf:'center',
       
        margin:5,
        padding: 7,
        borderRadius: 5,
        borderWidth:0.5,
        borderColor:'#E4D4F1'
        
    },
    overlayText: {
        color: '#f1f1f1',
        fontSize: 14,
        fontWeight: 'bold',
    },
    locationText: {
        color:'lightgrey',
        fontSize:13,
    }
    
})

export const searchBarStyling = StyleSheet.create({
    searchInput: {
        backgroundColor: '#321c43',
        borderRadius: 5,
        borderColor: '#E4D4F1',
        borderWidth: 0.4,
        padding: 10,
        marginBottom:10,
        // marginHorizontal: 2,
        // marginBottom:5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginBottom:6,
        borderBottomWidth: 0.4,
        borderBottomColor: '#e4d4f1',
    },
    location:{
        marginLeft:2,
        fontSize:12,
        color:'rgba(228, 212, 241, 0.7)'

    }
})