

import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, PanResponder } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import SlokBox from "../components/SlokBox";
import DropBox from "../components/DropBox";
import { incrementSlok,decrementSlok } from "../redux/gita_action_reducer";


// ch 1: [1,47]
// ch 2: [1,72]
// ch 3: [1,43]
// ch 4: [1,42]
// ch 5: [1,29]
// ch 6: [1,47]
// ch 7: [1,30]
// ch 8: [1,28]
// ch 9: [1,34]
// ch 10: [1,42]
// ch 11: [1,55]
// ch 12: [1,20]
// ch 13: [1,35]
// ch 14: [1,27]
// ch 15: [1,20]
// ch 16: [1,24]
// ch 17: [1,28]
// ch 18: [1,78]




const SlokScreen = ({ navigation }) => {


    const [swipeActive, setSwipeActive] = useState(false);
    // const [fcv, setfcv] = useState(1);
    // const [fnv, setfnv] = useState(1);

    const dispatch = useDispatch();
    const {field_nsutra_value,field_chapter_value,language} = useSelector(state => state.gita_action_reducer)
    // console.log(fcv1);
    

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (event, gestureState) => {

            if (!swipeActive) {
                if (Math.abs(gestureState.dx) > 10) {
                    if (gestureState.dx > 0) {
                        // setfnv(fnv - 1);
                        dispatch(decrementSlok());
                    } else {
                        // setfnv(fnv + 1);
                        dispatch(incrementSlok());
                    }
                    setSwipeActive(true);

                }
            }
        },

        onPanResponderRelease: () => {
            setSwipeActive(false);
        }
    });


    return (
        <View {...panResponder.panHandlers}>

            <View>
                <DropBox/>
            </View>
            <View>
                <SlokBox language={language} fcv={field_chapter_value} fnv={field_nsutra_value} />
            </View>
        </View>
    )
};


export default SlokScreen;