import React,{useEffect} from 'react';

import 'react-native-gesture-handler';
import {StyleSheet, SafeAreaView,StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import AudiosReducer from "./store/reducer/audios"
import LanguagesReducer from "./store/reducer/languages"
import CategoriesReducer from "./store/reducer/categories"
import UserReducer from "./store/reducer/user"
import Colors from './constants/color-palete';
import {Layout} from "./screens/Layout"

const rootReducer = combineReducers({
  audios : AudiosReducer,
  languages : LanguagesReducer,
  categories : CategoriesReducer,
  user : UserReducer
})

const store = createStore(rootReducer)

const App = ()=>{
  useEffect(()=>{
    SplashScreen.hide()
    // dynamicLinks()
    //   .getInitialLink()
    //   .then(link => {
    //     console.log("APP",link);
  //   });
  },[])

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.menu}/>
        <Provider store={store}>{<Layout/>}</Provider>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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