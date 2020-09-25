import React from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../constants/color-palete";
import Entypo from 'react-native-vector-icons/Entypo'

export const InputComponent = ({ label, value, setValue, ...props }) => {
  return (
    <View style={styles.inputContainer}>
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
          <Entypo name={props.icon} size={20} color={Colors.secondary} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  inputLabel: {
    padding: 10,
    fontSize: 15,
    color: Colors.secondary,
  },
  textInput: {
    color: Colors.primary,
    fontSize: 18,
    width: "90%",
  },
  together: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:'center',
    width:'90%',
  },
});
