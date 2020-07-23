import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const ProfileScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Profile screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
