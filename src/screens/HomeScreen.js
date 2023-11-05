

import React from "react";
import { Text, View,TouchableOpacity} from "react-native";


const HomeScreen = ({navigation}) => {

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("Slok")}>
                <Text>
                    This is homescreen
                </Text>
            </TouchableOpacity>
        </View>
    )
};


export default HomeScreen;