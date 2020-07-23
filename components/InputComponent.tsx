import React from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/color-palete";
import { Entypo } from "@expo/vector-icons";

export const InputComponent = ({ label, value, setValue, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.together}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.textInput}
          textContentType={props.type}
          secureTextEntry={props.type === "password" ? true : false}
          placeholder={props.placeholder}
        />
        {props.icon ? (
          <Entypo name={props.icon} size={24} color="black" />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    padding: 10,
    fontSize: 15,
    color: Colors.secondary,
  },
  textInput: {
    height: 30,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    color: Colors.primary,
    fontSize: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  together: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
