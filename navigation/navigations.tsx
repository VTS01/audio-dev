import React from "react"

import {Image,TouchableOpacity,StyleSheet} from "react-native"
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useDispatch} from "react-redux"

import {LoginScreen} from '../screens/LoginScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {HomePage} from '../screens/HomePage';
import {ProfilePage} from "../screens/ProfilePage"
import {SearchPage} from "../screens/SearchPage"
import {LanguagesPage} from "../screens/LanguagesPage" 
import {CategoriesPage} from "../screens/CategoriesPage" 
import {AudiosPage} from "../screens/AudiosPage" 

import Colors from "../constants/color-palete"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

export const LoginstackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:()=>(
            <Image 
              source={require('../assets/trans_mello.png')} 
              style={{
                width:70,
                height:70,
                resizeMode:'center'
              }}
            />),
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:()=>(
            <Image 
              source={require('../assets/trans_mello.png')} 
              style={{
                width:70,
                height:70,
                resizeMode:'center'
              }}
            />),
        }}
      />
    </Stack.Navigator>
  );
  
const HomePageStackNavigator = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Page"
        component={HomePage}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:()=>(
            <Image 
              source={require('../assets/trans_mello.png')} 
              style={{
                width:70,
                height:70,
                resizeMode:'center'
              }}
            />),
          headerRight:(props)=>{
            return(
              <TouchableOpacity
                style={styles.searchIcon}
                activeOpacity={.5}
                onPress={()=>navigation.navigate("Search Page")}
              >
                <AntDesign
                  name="search1"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            )
          }
        }}
      />
      <Stack.Screen
        name="Search Page"
        component={SearchPage}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:()=>(
            <Image 
              source={require('../assets/trans_mello.png')} 
              style={{
                width:70,
                height:70,
                resizeMode:'center'
              }}
            />),
        }}
      />
      <Stack.Screen
        name="Categories Page"
        component={CategoriesPage}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:"Categories",
          headerRight:(props)=>{
            return(
              <TouchableOpacity
                style={styles.searchIcon}
                activeOpacity={.5}
                onPress={()=>navigation.navigate("Search Page")}
              >
                <AntDesign
                  name="search1"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            )
          }
        }}
      />
      <Stack.Screen
        name="Languages Page"
        component={LanguagesPage}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:"Languages",
          headerRight:(props)=>{
            return(
              <TouchableOpacity
                style={styles.searchIcon}
                activeOpacity={.5}
                onPress={()=>navigation.navigate("Search Page")}
              >
                <AntDesign
                  name="search1"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            )
          }
        }}
      />
      <Stack.Screen
        name="Audios Page"
        component={AudiosPage}
        options={{
          headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerRight:(props)=>{
            return(
              <TouchableOpacity
                style={styles.searchIcon}
                activeOpacity={.5}
                onPress={()=>navigation.navigate("Search Page")}
              >
                <AntDesign
                  name="search1"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            )
          }
        }}
      />
    </Stack.Navigator>
);

const ProfilePageStackNavigator = ()=>(
  <Stack.Navigator>
    <Stack.Screen
      name="Profile Page"
      component={ProfilePage}
      options={{
        headerStyle: styles.appHeader,
          headerTintColor: Colors.headerText,
          headerTitle:()=>(
            <Image 
              source={require('../assets/trans_mello.png')} 
              style={{
                width:70,
                height:70,
                resizeMode:'center'
              }}
            />),
      }}
    />
  </Stack.Navigator>
)

export const TabNavigator = ()=>(
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor:Colors.secondary,
      showLabel:false
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomePageStackNavigator}
      options={{
        tabBarIcon:({color})=>(<FontAwesome name="home" size={26} color={color} />)
      }}  
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfilePageStackNavigator}
      options={{
        tabBarIcon:({color})=>(<Ionicons name="md-person" size={24} color={color} />)
      }}
    />
  </Tab.Navigator>
)

const styles = StyleSheet.create({
    appHeader: {
        backgroundColor: Colors.menu,
    },
    searchIcon:{
        marginRight:10
    }
})