import { StyleSheet } from "react-native";

export const forCategories = StyleSheet.create ({
    container: {
        flex: 1,
        paddingVertical: 10,
    },
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
    itemContainer: {
        borderWidth: 0.2,
        paddingVertical: 8,
        paddingHorizontal: 7,
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 2,
        marginRight: 10,
        height: 190,
        width: 220, // Adjust item width as needed
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 3,
        width: '100%', // Adjust image width as needed
        height: 140, // Adjust image height as needed
    },
    overlay: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#101010',
        shadowOffset: {
            width: 0,
            height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 5,
    },
    overlayText: {
        color: '#6155e5',
        fontSize: 13,
        fontWeight: 'bold',
    },
    
})