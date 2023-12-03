import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity,StyleSheet,useColorScheme  } from "react-native";


import { LightBackground,LightText,DarkBackground,DarkText } from "../../assets/Constants";

const SlokBox = ({ slok }) => {

    // console.log("slok",slok);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    let {title,text} = slok;

    
    return (
        <View style={[styles.container , { backgroundColor: isDarkMode ? '#333333' : '#FFFFFF' }]}>

            <Text style={[styles.title, { color: isDarkMode ? '#006cbb' : '#000000' }]}>{title}</Text>
            <Text style={[styles.text, { color: isDarkMode ? DarkText : LightText }]}>{text === "" ? text = "There is no commentry by this author." : text}</Text>
        </View>
    )



};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // White background
        paddingHorizontal: 16, // Padding on the left and right
        paddingVertical: 20, // Padding on the top and bottom
        borderRadius: 8, // Border radius for rounded corners
        margin: 10, // Margin around the component
        borderColor: '#EDEDED', // Border color (optional)
        borderWidth: 1, // Border width (optional)
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 7,
      },
      text: {
        color: '#000000', // Black text
        lineHeight: 26, // Line height for increased spacing between lines
      },
});

export default SlokBox;