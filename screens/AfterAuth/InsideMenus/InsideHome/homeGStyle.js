import { StyleSheet } from "react-native";

export const forCategories = StyleSheet.create ({
    
    // Styling categorie boxes
    categories: {
        // paddingHorizontal: 10,
    },
    categoryItem: {
        borderWidth: 1,
        borderColor: 'lightblue',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    categoryText: {
        color: 'lightblue',
        fontWeight: 'bold',
    },
    selectedCategory: {
        backgroundColor: 'lightblue',
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

    itemContainer: {
        borderWidth: 0.6,
        paddingVertical: 8,
        paddingHorizontal: 10,
        // alignItems: 'center',
        // backgroundColor: '#353535',
        borderRadius: 5,
        borderColor:'lightblue',
        marginRight: 10,
        // height: 200,
        // width: 220,// Adjust item width as needed
    },
    image: {
        resizeMode:'cover',
        borderRadius: 2,
        // width: '100%', // Adjust image width as needed
        height: 120, // Adjust image height as needed
    },
    overlay: {
        alignSelf:'center',
        // backgroundColor: '#353535',
        margin:5,
        padding: 7,
        borderRadius: 5,
        borderWidth:0.5,
        borderColor:'lightblue'
        // shadowColor: 'lightblue',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        //     },
        //     shadowOpacity: 0.1,
        //     shadowRadius: 2,
        //     elevation: 5,
    },
    overlayText: {
        color: '#f1f1f1',
        fontSize: 14,
        fontWeight: 'bold',
    },
    locationText: {
        color:'#f1f1f1',
        fontSize:13,
    }
    
})

export const searchBarStyling = StyleSheet.create({
    searchInput: {
        backgroundColor: '#353535',
        borderRadius: 5,
        borderColor: 'lightblue',
        borderWidth: 0.5,
        padding: 10,
        // marginHorizontal: 2,
        // marginBottom:5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    location:{
        marginLeft:2,
        fontSize:12,
        color:'#505050'

    }
})