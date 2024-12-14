import React,{useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
const ThreeDotMenu = () => {

  const [isOverflowMenuVisible, setOverflowMenuVisibility] = useState(false);


  const navigation = useNavigation();

    return (
        <View style={styles.OverflowMenu} >
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Bookmarks")} >
                <Text style={styles.text}>Bookmark List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.text}>Rate Us</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    OverflowMenu: {
      marginHorizontal: 5,
      // marginVertical: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      // elevation: 5, // For Android shadow
      shadowColor: 'black', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    menuItem: {
      paddingVertical: 10,
      color: '#fff',
    },
    text : {
      color: '#000',
    },
    
  });

export default ThreeDotMenu;