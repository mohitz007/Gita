import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";

const SlokBoxPrimary = ({ slok, language }) => {

    // console.log("slok",slok);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const SlokHeaderLanguage = () => {
        console.log("Slok");
        switch (language) {
            case "bn": return "মূল শ্লোকঃ";
            case "dv": return "मूल श्लोक";
            case "gu": return "મૂલ શ્લોકઃ";
            case "pa": return "ਮੂਲ ਸ਼ਲੋਕਃ";
            case "kn": return "ಮೂಲ ಶ್ಲೋಕಃ";
            case "ml": return "മൂല ശ്ലോകഃ";
            case "or": return "ମୂଳ ଶ୍ଲୋକଃ";
            case "ro": return "mūla ślokaḥ";
            case "ta": return "மூல ஶ்லோகஃ";
            case "te": return "మూల శ్లోకః";
            case "as": return "মূল শ্লোকঃ";
            default: return "मूल श्लोकः";
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#333333' : '#FFFFFF' }]}>
            <Text style={[styles.header, { color: isDarkMode ? '#006cbb' : '#000000' }]}>{SlokHeaderLanguage()}</Text>
            <Text style={[styles.text, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>{slok}</Text>
        </View>
    )



};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#FFFFFF', // background
        paddingHorizontal: 16, // Padding on the left and right
        paddingVertical: 20, // Padding on the top and bottom
        borderRadius: 8, // Border radius for rounded corners
        margin: 10, // Margin around the component
        borderColor: '#EDEDED', // Border color (optional)
        borderWidth: 1, // Border width (optional)
    },
    text: {
        color: '#000000', // Black text
        // textAlignVertical: 'bottom',
        lineHeight: 15, // Line height for increased spacing between lines

    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 7,
    }
});


export default SlokBoxPrimary;