import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/color-palete";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Card = (props) => {
  
  const handleCardPress = ()=>{
    props.setSelectedTrack(props.item)
    props.setShowModal(true)
  }

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      style={{ ...styles.card, ...props.style }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    height: 230,
    width: 130,
    margin: 10,
  },
});
