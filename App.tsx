import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Colors from './constants/color-palete';
// import {Feather} from '@expo/vector-icons';
import {ProfileScreen} from './screens/ProfileScreen';
import {DashboardScreen} from './screens/DashboardScreen';
import {LoginScreen} from './screens/LoginScreen';
import Feather from 'react-native-vector-icons/Feather'

import {SignupScreen} from './screens/SignupScreen';
import {PlaylistScreen} from './screens/PlaylistScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LoginstackNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: 'Login',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
        headerLeft: () => (
          <Feather
            name="menu"
            size={27}
            color={Colors.headerText}
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{
        title: 'Sign up',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
        headerLeft: () => (
          <Feather
            name="menu"
            size={27}
            color={Colors.headerText}
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const DashboardstackNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        title: 'Dashboard',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
        headerLeft: () => (
          <Feather
            name="menu"
            size={27}
            color={Colors.headerText}
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfilestackNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
        headerLeft: () => (
          <Feather
            name="menu"
            size={27}
            color={Colors.headerText}
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const PlayListstackNavigator = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Playlist"
      component={PlaylistScreen}
      options={{
        title: 'Playlist',
        headerStyle: styles.appHeader,
        headerTintColor: Colors.headerText,
        headerLeft: () => (
          <Feather
            name="menu"
            size={27}
            color={Colors.headerText}
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const DrawerTabs = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Dashboard" component={DashboardstackNavigator} />
    <Drawer.Screen name="Login" component={LoginstackNavigator} />
    <Drawer.Screen name="Profile" component={ProfilestackNavigator} />
    <Drawer.Screen name="Playlist" component={PlayListstackNavigator} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <DrawerTabs />
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
