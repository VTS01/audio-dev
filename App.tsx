import React,{useEffect} from 'react';

import 'react-native-gesture-handler';
import {StyleSheet, SafeAreaView,StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';

import AudiosReducer from "./store/reducer/audios"
import LanguagesReducer from "./store/reducer/languages"
import CategoriesReducer from "./store/reducer/categories"
import Colors from './constants/color-palete';
import {LoginScreen} from './screens/LoginScreen';
import {SignupScreen} from './screens/SignupScreen';
import {PlaylistScreen} from './screens/PlaylistScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const rootReducer = combineReducers({
  audios : AudiosReducer,
  // languages : LanguagesReducer,
  categories : CategoriesReducer
})

const store = createStore(rootReducer)

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



const App = ()=>{
  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.menu}/>
        <Provider store={store}>{<PlayListstackNavigator/>}</Provider>
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
    backgroundColor:'red',
  },
  menuIcon: {
    marginRight: 20,
    paddingHorizontal: 10,
  },
});

export default App