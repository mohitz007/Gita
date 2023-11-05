import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useSelector,useDispatch } from "react-redux";

import { setSlok,setChapter } from "../redux/gita_action_reducer";

const DropBox = () => {

    const dispatch = useDispatch();

    const {field_nsutra_value: fnv,field_chapter_value: fcv} = useSelector(state => state.gita_action_reducer)

    console.log("drop box",fcv,fnv);

    const sloks = []
    const chapters = []

    const slokLimit = (fcv) => {

        switch (fcv) {
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


    for(let i = 1; i <=slokLimit(fcv); i++) {
        sloks.push({label: `Slok ${i}`, value: i});
    }

    for(let i = 1; i <=18; i++) {
        chapters.push({label: `Chapter ${i}`, value: i});
    }



    // const [slokValue, setslokValue] = useState(fnv);
    // const [chapterValue, setchapterValue] = useState(fcv)


    const setchapterValue = (chapterValue) => {
        dispatch(setChapter(chapterValue));
    };

    const setslokValue = (slokValue) => {
        dispatch(setSlok(slokValue));
    };

    return (
        <View>
            <View>
            <Picker
                selectedValue={fcv}
                onValueChange={(itemValue, itemIndex) => setchapterValue(itemValue)}
                mode="dropdown"
                >
                {chapters.map((option,index) =>(
                    <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
            </Picker>
            </View>
            <View>

            <Picker
                selectedValue={fnv}
                onValueChange={(itemValue, itemIndex) => setslokValue(itemValue)}
                mode="dropdown"
                >
                {sloks.map((option,index) =>(
                    <Picker.Item key={index} label={option.label} value={option.value} />
                    ))}
            </Picker>
                    </View>
        </View>
    )
}


export default DropBox;