import React, { useState,useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { CheckBox } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';

import { setSlokChapterLanguage, setTranslation } from "../redux/gita_action_reducer";

import { LightBackground, LightText, DarkBackground, DarkText } from "../../assets/Constants";

const SettingsScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
    const isFocused = useIsFocused();


    useEffect(() => {
        if (!isFocused) {
            console.log("Not Focused");
            dispatch(setSlokChapterLanguage([...checked, languageValue]));
        }
      }, [isFocused]);

    const { field_nsutra_value, field_chapter_value, language } = useSelector(state => state.gita_action_reducer.data);
    const { htrskd,
        httyn,
        htshg,
        scsh,
        hcchi,
        hcrskd,
        scang,
        scram,
        scanand,
        scjaya,
        scmad,
        scval,
        scms,
        scsri,
        scvv,
        scpur,
        scneel,
        scdhan,
        ecsiva,
        etsiva,
        etpurohit,
        etgb,
        setgb,
        etssa,
        etassa,
        etradi,
        etadi } = useSelector(state => state.gita_action_reducer.data);

    const [checked, setChecked] = useState([
        { title: "Hindi Translation By Swami Ramsukhdas", value: Boolean(htrskd.value), name: "htrskd" },
        { title: "Hindi Translation By Swami Tejomayananda", value: Boolean(httyn.value), name: "httyn" },
        { title: "Hindi Translation Of Sri Shankaracharya's Sanskrit Commentary By Sri Harikrishnadas Goenka", value: Boolean(htshg.value), name: "htshg" },
        { title: "Hindi Commentary By Swami Chinmayananda", value: Boolean(hcchi.value), name: "hcchi" },
        { title: "Hindi Commentary By Swami Ramsukhdas", value: Boolean(hcrskd.value), name: "hcrskd" },
        { title: "Sanskrit Commentary By Sri Shankaracharya", value: Boolean(scsh.value), name: "scsh" },
        { title: "Sanskrit Commentary By Sri Abhinavgupta", value: Boolean(scang.value), name: "scang" },
        { title: "Sanskrit Commentary By Sri Ramanuja", value: Boolean(scram.value), name: "scram" },
        { title: "Sanskrit Commentary By Sri Anandgiri", value: Boolean(scanand.value), name: "scanand" },
        { title: "Sanskrit Commentary By Sri Jayatritha", value: Boolean(scjaya.value), name: "scjaya" },
        { title: "Sanskrit Commentary By Sri Madhavacharya", value: Boolean(scmad.value), name: "scmad" },
        { title: "Sanskrit Commentary By Sri Vallabhacharya", value: Boolean(scval.value), name: "scval" },
        { title: "Sanskrit Commentary By Sri Madhusudan Saraswati", value: Boolean(scms.value), name: "scms" },
        { title: "Sanskrit Commentary By Sri Sridhara Swami", value: Boolean(scsri.value), name: "scsri" },
        { title: "Sanskrit Commentary By Sri Vedantadeshikacharya Venkatanatha", value: Boolean(scvv.value), name: "scvv" },
        { title: "Sanskrit Commentary By Sri Purushottamji", value: Boolean(scpur.value), name: "scpur" },
        { title: "Sanskrit Commentary By Sri Neelkanth", value: Boolean(scneel.value), name: "scneel" },
        { title: "Sanskrit Commentary By Sri Dhanpati", value: Boolean(scdhan.value), name: "scdhan" },
        { title: "English Commentary By Swami Sivananda", value: Boolean(ecsiva.value), name: "ecsiva" },
        { title: "English Translation By Swami Sivananda", value: Boolean(etsiva.value), name: "etsiva" },
        { title: "English Translation by Shri Purohit Swami", value: Boolean(etpurohit.value), name: "etpurohit" },
        { title: "English Translation By Swami Gambirananda", value: Boolean(etgb.value), name: "etgb" },
        { title: "English Translation Of Sri Shankaracharya's Sanskrit Commentary By Swami Gambirananda", value: Boolean(setgb.value), name: "setgb" },
        { title: "English Translation By By Dr. S. Sankaranarayan", value: Boolean(etssa.value), name: "etssa" },
        { title: "English Translation of Abhinavgupta's Sanskrit Commentary By Dr. S. Sankaranarayan", value: Boolean(etassa.value), name: "etassa" },
        { title: "English Translation of Ramanuja's Sanskrit Commentary By Swami Adidevananda", value: Boolean(etradi.value), name: "etradi" },
        { title: "English Translation By Swami Adidevananda", value: Boolean(etadi.value), name: "etadi" },


    ]);


    const [languageValue, setlanguageValue] = useState(language);

    const languages = [
        { name: "Devanagri", value: "dv" },
        { name: "Assamese", value: "as" },
        { name: "Bengali", value: "bn" },
        { name: "Gujarati", value: "gu" },
        { name: "Gurmukhi", value: "pa" },
        { name: "Kannada", value: "kn" },
        { name: "Malayalam", value: "ml" },
        { name: "Odia", value: "or" },
        { name: "English", value: "ro" },
        { name: "Tamil", value: "ta" },
        { name: "Telugu", value: "te" },
    ]



    const handleCheckboxToggle = (index) => {
        const newCheckedItems = [...checked];
        newCheckedItems[index].value = !newCheckedItems[index].value;
        setChecked(newCheckedItems);
    };

    const handleSubmit = () => {
        // console.log(checked);
        dispatch(setSlokChapterLanguage([...checked, languageValue]));
        navigation.navigate("Slok");

    };

    return (
        <View style={{ backgroundColor: colorScheme === 'dark' ? DarkBackground : LightBackground ,flex: 1}}>

            <ScrollView style={styles.scrollViewStyle}>

                <View >
                    <Picker
                        selectedValue={languageValue}
                        onValueChange={(itemValue, itemIndex) => setlanguageValue(itemValue)}
                        mode="dropdown"

                    >
                        {languages.map((option, index) => (
                            <Picker.Item key={index} label={`Language - ${option.name}`} value={option.value} />
                        ))}
                    </Picker>
                </View>


                {checked.map((item, index) => (

                    <CheckBox
                        key={index}
                        title={item.title}
                        checked={item.value}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={'checkbox-blank-outline'}
                        onPress={() => handleCheckboxToggle(index)}
                        containerStyle={styles.checkBoxContainer}
                        textStyle={styles.checkBoxText}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#3498db', // Blue background color
        padding: 10, // Padding around the button
        borderRadius: 5, // Border radius for rounded corners
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        marginHorizontal: 20,
        // alignSelf: 'flex-end', // Align the button to the right
        marginVertical: 10, // Add margin as needed
        position: "absolute",
        width: "90%",
        bottom: 5,

    },
    submitButtonText: {
        color: '#ffffff', // White text color
        fontSize: 16, // Font size
    },
    checkBoxContainer: {
        borderRadius: 10, // Adjust the value for your preferred rounded corners
    },
    scrollViewStyle: {
        marginBottom: 60, //
    },
    checkBoxText: {
        flex: 1, // Set flex to allow the text to take available space
        marginLeft: 10, // Adjust as needed to add space between checkbox and text
    },
    picker: {
        backgroundColor: '#ffffff',
        borderRadius : 10,
        width : "95%",
        marginHorizontal : 10,
        marginTop : 5,
    }

});


export default SettingsScreen;
