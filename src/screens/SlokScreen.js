
import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, PanResponder, ScrollView, StyleSheet, useColorScheme, Animated, Easing } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { HeaderButtons,HeaderButton, Item, OverflowMenu,overflowMenuPressHandlerDropdownMenu, overflowMenuPressHandlerPopupMenu } from 'react-navigation-header-buttons';
import { RectButton } from "react-native-gesture-handler";

import ThreeDotMenu from "../components/ThreeDotMenu";
import SlokBox from "../components/SlokBox";
import DropBox from "../components/DropBox";
import { setSlokChapterLanguage } from "../redux/gita_action_reducer";
import { add_bookmark,remove_bookmark } from "../redux/gita_additional_data_reducer";
import SlokBoxPrimary from "../components/SlokBoxPrimary";

import { LightBackground, DarkBackground } from "../../assets/Constants";

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



// to do
// add some animation for reqaching last slok
// design bookmark screen
// bug: overflow menu not closing after navigating

const SlokScreen = ({ navigation }) => {

    // const [swipeActive, setSwipeActive] = useState(false);
    const swipeActiveRef = useRef();
    const dispatch = useDispatch();

    const MaterialHeaderButton = (props) => (
        // the `props` here come from <Item ... />
        // you may access them and pass something else to `HeaderButton` if you like
        <HeaderButton iconSize={23} {...props} />
      );

    const data = useSelector(state => state.gita_action_reducer.data);
    const { status } = useSelector(state => state.gita_action_reducer);
    const { field_nsutra_value, field_chapter_value, language } = useSelector(state => state.gita_action_reducer.data);
        // console.log(field_chapter_value,field_nsutra_value);
    const bookmarkList = useSelector(state => state.gita_additional_data_reducer.bookmarks);
    console.log("book",bookmarkList);

    const isBookmarkExist = bookmarkList.some(
        (bookmark) =>
          bookmark["field_chapter_value"] !== undefined && bookmark["field_nsutra_value"] !== undefined && 
          bookmark["field_chapter_value"] == field_chapter_value &&
          bookmark["field_nsutra_value"] == field_nsutra_value
    );
      console.log("isBookmarkExist",isBookmarkExist);

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    // console.log(data);
    // console.log(status);

    useEffect(() => {
        // console.log("useeffect");

        // swipeActiveRef.current = false;

        if (status === 'loading') {
            startLoadingAnimation();
        }

        if (status === "idle") {
            dispatch(setSlokChapterLanguage([field_chapter_value, field_nsutra_value, language]));
        }
    }, [status]);

    useEffect(() => {

        navigation.setOptions({
            headerTitle: "Sloks",
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}  >
                  {
                  isBookmarkExist?
                  <Item
                  title="bookmarkSelected"
                  iconName="bookmark"
                  IconComponent={FontAwesome}
                  color={"#3498db"}
                  onPress={() => dispatch(remove_bookmark({field_chapter_value,field_nsutra_value}))}
                />
                  :
                    <Item
                    title="bookmark"
                    iconName="bookmark-o"
                    IconComponent={FontAwesome}
                    color={"black"}
                    onPress={() => dispatch(add_bookmark({field_chapter_value,field_nsutra_value}))}
                  />
                  }
                  <OverflowMenu
                    
                    OverflowIcon={({ color }) => (
                      <Feather name="more-vertical" size={23} color={color} />
                    )}
                  >
                    {/* <ThreeDotMenu /> */}
                  </OverflowMenu>

                </HeaderButtons>
              </View>
            ),
        });

    },[navigation,isBookmarkExist,field_chapter_value, field_nsutra_value]);


    const arrowRotation = useRef(new Animated.Value(0)).current;

    const startLoadingAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(arrowRotation, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true, // Set useNativeDriver to true
                }),
                Animated.timing(arrowRotation, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true, // Set useNativeDriver to true
                }),
            ]),
            { iterations: 300 } // Change the number of iterations as needed
        ).start();
    };


    function findSlokLimit(chapter) {
        let slokLimit;
        switch (chapter) {
            case 1:
                slokLimit = 47;
                break;
            case 2:
                slokLimit = 72;
                break;
            case 3:
                slokLimit = 43;
                break;
            case 4:
                slokLimit = 42;
                break;
            case 5:
                slokLimit = 29;
                break;
            case 6:
                slokLimit = 47;
                break;
            case 7:
                slokLimit = 30;
                break;
            case 8:
                slokLimit = 28;
                break;
            case 9:
                slokLimit = 34;
                break;
            case 10:
                slokLimit = 42;
                break;
            case 11:
                slokLimit = 55;
                break;
            case 12:
                slokLimit = 20;
                break;
            case 13:
                slokLimit = 35;
                break;
            case 14:
                slokLimit = 27;
                break;
            case 15:
                slokLimit = 20;
                break;
            case 16:
                slokLimit = 24;
                break;
            case 17:
                slokLimit = 28;
                break;
            case 18:
                slokLimit = 78;
                break;
        }
        return slokLimit;
    }


    const handleIncreaseSlok = () => {
        let chapter = field_chapter_value;
        let slok = field_nsutra_value + 1;
        let slokLimit = findSlokLimit(chapter);


        if (slok == slokLimit + 1 && chapter == 18) {
            console.log("last chapter and slok");
            return;
        }

        if (slok <= slokLimit) {
            dispatch(setSlokChapterLanguage([chapter, slok, language]));
        }
        else {
            dispatch(setSlokChapterLanguage([chapter + 1, 1, language]));
        }


    };


    const handleDecreaseSlok = () => {
        let chapter = field_chapter_value;
        let slok = field_nsutra_value - 1;


        if (slok == 0 && chapter == 1) {
            console.log("1st chapter and slok");
            return;
        }

        if (slok >= 1) {
            dispatch(setSlokChapterLanguage([chapter, slok, language]));
        }
        else {
            chapter--;
            let slokLimit = findSlokLimit(chapter);
            dispatch(setSlokChapterLanguage([chapter, slokLimit, language]));
        }


    };

    const handleReload = () => {
        dispatch(setSlokChapterLanguage([field_chapter_value, field_nsutra_value, language]));
    };



    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (event, gestureState) => {

            if (!swipeActiveRef.current) {
                if (Math.abs(gestureState.dx) > 20) {
                    if (gestureState.dx > 0) {
                        // setfnv(fnv - 1);
                        // dispatch(setSlokChapterLanguage([field_chapter_value, field_nsutra_value - 1, language]));
                        handleDecreaseSlok();
                    } else {
                        // setfnv(fnv + 1);
                        // dispatch(setSlok(fnv + 1));
                        // dispatch(setSlokChapterLanguage([field_chapter_value, field_nsutra_value + 1, language]));
                        handleIncreaseSlok();
                    }
                    // setSwipeActive(true);
                    // swipeActiveRef.current = true;

                }
            }
        },

        onPanResponderRelease: () => {
            console.log('onPanResponderRelease');
            // setSwipeActive(false);
            swipeActiveRef.current = false;
        }
    });

    if (status === 'loading') {
        return <View style={{ backgroundColor: isDarkMode ? DarkBackground : LightBackground, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.View
                style={[
                    styles.arrow,
                    {
                        transform: [
                            {
                                rotate: arrowRotation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <AntDesign name="loading1" size={50} color="#3498db" />
            </Animated.View>
            <Text>Loading...</Text>
        </View>;
    }

    if (status === 'rejected') {
        return <View style={{ backgroundColor: isDarkMode ? DarkBackground : LightBackground, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Something went wrong. Lets retry.</Text>
            <RectButton style={styles.submitButton} onPress={handleReload}>
                <Text style={styles.submitButtonText}>Retry</Text>
            </RectButton>
        </View>;
    }

    if (status === 'success') {
        return (
            <ScrollView {...panResponder.panHandlers} contentContainerStyle={styles.scrollViewContainerStyle} style={{ backgroundColor: isDarkMode ? DarkBackground : LightBackground }} >

                <View>
                    <DropBox />
                </View>
                <SlokBoxPrimary slok={data.slok} language={language} />
                <View>
                    {Object.entries(data).map(([key, value]) => {
                        if (typeof value === 'object' && value !== null && value.value !== 0) {
                            // console.log(value,"\n");
                            return (
                                <SlokBox key={key} slok={value} />
                            )
                        }
                        return null;
                    })}
                </View>
            </ScrollView>
        )
    }
};


const styles = StyleSheet.create({
    scrollViewContainerStyle: {
        flexGrow: 1
    },
    scrollViewStyle: {
        backgroundColor: "#eef6f9",
    },
    arrow: {
        width: 50,
        height: 50,
        // Other styles for your arrow
    },
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


export default SlokScreen;