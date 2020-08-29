import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import {StyleSheet, SafeAreaView,StatusBar} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Colors from './constants/color-palete';
import {LoginScreen} from './screens/LoginScreen';
// import Feather from 'react-native-vector-icons/Feather'
import SplashScreen from 'react-native-splash-screen'

import {SignupScreen} from './screens/SignupScreen';
import {PlaylistScreen} from './screens/PlaylistScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LoginstackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: 'Login',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        title: 'Sign up',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
      }}
    />
  </Stack.Navigator>
);

const PlayListstackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Mello"
      component={PlaylistScreen}
      options={{
        title: 'Mello',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
      }}
    />
  </Stack.Navigator>
);



export default function App() {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.menu}/>
        <PlayListstackNavigator/>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: Colors.menu,
  },
  container: {
    flex: 1,
  },
  menuIcon: {
    marginRight: 20,
    paddingHorizontal: 10,
  },
});
