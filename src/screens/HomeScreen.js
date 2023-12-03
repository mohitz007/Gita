
import React, { useRef, useEffect } from 'react';
import { View,Text, Image, StyleSheet, TouchableOpacity, Animated, Easing, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';


const HomeScreen = ({ navigation }) => {

    const arrowOpacity = useRef(new Animated.Value(1)).current;


    const handleSwipe = () => {
        navigation.navigate('Slok'); // Navigate to Slok screen on left swipe
    };


    const startBlinkAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(arrowOpacity, {
                    toValue: 0.5,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowOpacity, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: 300 } // Change the number of iterations as needed
        ).start();
    };

    useEffect(() => {
        startBlinkAnimation(); // Start blinking animation when the component mounts
    }, []); // Empty dependency array to ensure the effect runs only once




    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dx < -50; // Set the threshold for left swipe
            },
            onPanResponderRelease: () => {
                handleSwipe();
            },
        })
    ).current;
    
        // console.log(arrowOpacity);

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <Image source={require('../../assets/images/krishna-homeScreen.jpg')} style={styles.backgroundImage} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Bhagavad Gita</Text>
            </View>
            <TouchableOpacity onPress={handleSwipe} style={styles.arrowContainer} >
            <Animated.View style={{ opacity: arrowOpacity }}>
                <AntDesign name="arrowright" size={90} color="#000000" />
            </Animated.View>

            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        // flex: 1,
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.75,
    },
    arrowContainer: {
        position: 'absolute',
        bottom: "50%",
        right: 20,
    },
    arrow: {
        width: 40,
        height: 40,
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
      },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
      },
});


export default HomeScreen;