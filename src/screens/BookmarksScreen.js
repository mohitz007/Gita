import React, { useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { CheckBox } from "@rneui/themed";
import { useDispatch, useSelector } from 'react-redux';

import { LightBackground, LightText, DarkBackground, DarkText } from "../../assets/Constants";

const BookmarksScreen = () => {

    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
    const bookmarkList = useSelector(state => state.gita_additional_data_reducer.bookmarks);

    return (
        <View style={{ backgroundColor: colorScheme === 'dark' ? DarkBackground : LightBackground, flex: 1 }}>

            <ScrollView style={styles.scrollViewStyle}>


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
}

export default BookmarksScreen;