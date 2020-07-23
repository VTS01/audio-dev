import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import Colors from "../constants/color-palete";
import { InputComponent } from "../components/InputComponent";
import { Divider } from "../components/Divider";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const loginWithEmail = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Dashboard");
      })
      .catch(() => {
        Alert.alert("User not exist", "Please sign up", [{ text: "Ok" }]);
      });
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider().addScope(
      "https://www.googleapis.com/auth/userinfo.profile"
    );
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(console.log)
      .catch(() =>
        Alert.alert(
          "Google Login Issue",
          "Not able to login with Google authetication at the moment",
          [{ text: "Sorry!" }]
        )
      );
  };

  return (
    <View style={styles.screen}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Text style={styles.tagLine}>Listen to the Web..</Text>
      <View style={styles.inputContainer}>
        <InputComponent
          label="Email"
          value={email}
          setValue={handleEmailChange}
          type="emailAddress"
          icon="mail"
          placeholder="Enter Email Address"
        />
        <InputComponent
          label="Password"
          value={password}
          setValue={handlePasswordChange}
          type="password"
          icon="lock"
          placeholder="Enter Password"
        />
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={() => loginWithEmail()}
            color={Colors.secondary}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: Colors.danger }}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: Colors.primary }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Divider text="or" />
        <View style={styles.button}>
          <Button
            title="Login with Google"
            onPress={loginWithGoogle}
            color={Colors.danger}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    height: 50,
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
  },
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: Colors.logobackground,
    borderWidth: 1,
    marginVertical: 30,
    borderRadius: 50,
  },
  tagLine: {
    fontSize: 20,
    fontWeight: "400",
  },
});
