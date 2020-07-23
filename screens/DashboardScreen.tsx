import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const DashboardScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Dashboard Screen</Text>
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
