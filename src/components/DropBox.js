import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity,StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from "react-redux";
import { RectButton } from 'react-native-gesture-handler';

import { setSlokChapterLanguage } from "../redux/gita_action_reducer";

const DropBox = () => {

    const dispatch = useDispatch();
    const { field_nsutra_value, field_chapter_value, language } = useSelector(state => state.gita_action_reducer.data)
    // console.log("drop box value from use selector", field_chapter_value, field_nsutra_value, "language" + language);

    const sloks = []
    const chapters = []

    const slokLimitForEachChapter = (chapter) => {

        switch (chapter) {
            case 1:
                return 47
            case 2:
                return 72
            case 3:
                return 43
            case 4:
                return 42
            case 5:
                return 29
            case 6:
                return 47
            case 7:
                return 30
            case 8:
                return 28
            case 9:
                return 34
            case 10:
                return 42
            case 11:
                return 55
            case 12:
                return 20
            case 13:
                return 35
            case 14:
                return 27
            case 15:
                return 20
            case 16:
                return 24
            case 17:
                return 28
            case 18:
                return 78
        }
    }

    useEffect(() => {
        setslokValue(field_nsutra_value);
        setchapterValue(field_chapter_value);
    }, [field_nsutra_value,field_chapter_value])
    

    const [slokValue, setslokValue] = useState(field_nsutra_value);
    const [chapterValue, setchapterValue] = useState(field_chapter_value);

    for (let i = 1; i <= 18; i++) {
        chapters.push({ label: `Chapter ${i}`, value: i });
    }

    for (let i = 1; i <= slokLimitForEachChapter(chapterValue); i++) {
        sloks.push({ label: `Slok ${i}`, value: i });
    }
    const handleSubmit = () => {
        // console.log('Submit');
        dispatch(setSlokChapterLanguage([chapterValue, slokValue, language]));
    }

    return (
        <View>
            <View>
                <Picker
                    selectedValue={chapterValue}
                    onValueChange={(itemValue, itemIndex) => setchapterValue(itemValue)}
                    mode="dropdown"
                >
                    {chapters.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            <View>

                <Picker
                    selectedValue={slokValue}
                    onValueChange={(itemValue, itemIndex) => setslokValue(itemValue)}
                    mode="dropdown"
                >
                    {sloks.map((option, index) => (
                        <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
                </Picker>
            </View>
            <View>
                <RectButton style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </RectButton>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#3498db', // Blue background color
        padding: 10, // Padding around the button
        borderRadius: 5, // Border radius for rounded corners
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        marginHorizontal: 20,
      },
      submitButtonText: {
        color: '#ffffff', // White text color
        fontSize: 16, // Font size
      },

});


export default DropBox;