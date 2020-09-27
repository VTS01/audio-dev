import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/color-palete";

export const Divider = (props) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider} />
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginVertical: 10,
  },
  divider: {
    borderWidth: 1,
    borderTopColor: "gray",
    width: 110,
    top: 2,
  },
  text: {
    fontSize: 15,
    color: Colors.secondary,
    marginHorizontal: 10,
  },
});
