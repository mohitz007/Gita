import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import SettingsScreen from './src/screens/SettingsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SlokScreen from './src/screens/SlokScreen';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import BookmarksScreen from './src/screens/BookmarksScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const App = () => {



  const StackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Slok"
          component={SlokScreen}
          options={{
            headerShown: true,
          }}

        />
        <Stack.Screen
          name="Bookmarks"
          component={BookmarksScreen}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <HeaderButtonsProvider stackType={"js"} spaceAboveMenu={50}>
          <Tab.Navigator>
            <Tab.Screen
              name="StackHome"
              component={StackNavigator}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="book" color={color} size={size} />
                ),
                headerShown: false,
                title: "Home",
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="translate" color={color} size={size} />
                ),
                title: "Translations & Languages",
              }}
            />
          </Tab.Navigator>
        </HeaderButtonsProvider>
      </NavigationContainer>
    </Provider>
  );
}




export default App;
