import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PlaylistScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Playlitst Screen</Text>
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
