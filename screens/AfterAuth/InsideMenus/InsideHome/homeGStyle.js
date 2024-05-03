import { StyleSheet } from "react-native";

export const forCategories = StyleSheet.create ({
    
    // Styling categorie boxes
    categories: {
        // paddingHorizontal: 10,
    },
    categoryItem: {
        borderWidth: 1,
        borderColor: '#6155e5',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 5,
    },
    categoryText: {
        color: '#6155e5',
        fontWeight: 'bold',
    },
    selectedCategory: {
        backgroundColor: '#6155e5',
    },
    selectedText: {
        color: '#f1f1f1',
    },
    flatListContent: {
        alignItems: 'center',
    },
    
    // The data container
    theFrame: {
        backgroundColor:'rgba(25, 25, 25, 0.7)',
        padding:15,
        // minHeight: '92.5%',
        borderRadius:5,  
        marginVertical:10,
        
    
    },

    itemContainer: {
        borderWidth: 0.5,
        paddingVertical: 8,
        paddingHorizontal: 7,
        // alignItems: 'center',
        backgroundColor: '#353535',
        borderRadius: 5,
        borderColor:'#6155e5',
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
        borderColor:'#6155e5'
        // shadowColor: '#6155e5',
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