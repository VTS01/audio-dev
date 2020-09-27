import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/color-palete";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Card = (props) => {
  return (
    <View
      style={{ ...styles.card, ...props.style }}
    >
      {props.children}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    height: 300,
    position:'relative',
    width: '95%',
    margin: 10,
    elevation : 5,
    backgroundColor : 'white',
    borderRadius : 2,
    shadowOffset :{
      width : 1,
      height : 1
    },
    paddingHorizontal:5,
  },
});
