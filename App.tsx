import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Colors from "./constants/color-palete";
import { Feather } from "@expo/vector-icons";
import { ProfileScreen } from "./screens/ProfileScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { LoginScreen } from "./screens/LoginScreen";

import * as firebase from "firebase";
import { firebaseConfig } from "./fireBase/fireBaseConfig";
import { SignupScreen } from "./screens/SignupScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const LoginstackNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: "Login",
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
        title: "Sign up",
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

const DashboardstackNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        title: "Dashboard",
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

const ProfilestackNavigator = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profile",
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
    <Drawer.Screen name="Login" component={LoginstackNavigator} />
    <Drawer.Screen
      name="Profile"
      component={ProfilestackNavigator}
    ></Drawer.Screen>
    <Drawer.Screen
      name="Dashboard"
      component={DashboardstackNavigator}
    ></Drawer.Screen>
  </Drawer.Navigator>
);

export default function App() {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <DrawerTabs />
        <StatusBar style="auto" />
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
