import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';


import SettingsScreen from './src/screens/SettingsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SlokScreen from './src/screens/SlokScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const App = () => {



  const StackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{headerTitle: "Books"}}
        />
        <Stack.Screen 
        name="Slok" 
        component={SlokScreen}
        options={{headerTitle: "Sloks"}}

         />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen 
        name="StackHome" 
        component={StackNavigator}
        options={{
          tabBarIcon: ({color,size}) => (
            <AntDesign name="book" color={color} size={size} />
          ),
          headerShown: false,

        }}
          />
        <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color,size}) => (
            <Feather name="settings" color={color} size={size} />
          )
        }} 
        />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
