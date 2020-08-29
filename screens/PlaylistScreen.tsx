import React from "react";

import {View ,StyleSheet} from "react-native";
import { Catagory } from "../components/catagories/Catagory";
import { ScrollView } from "react-native-gesture-handler";

export const PlaylistScreen = () => {

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Catagory
          catagory="Art & Culture"
          id = {0}
        />
        <Catagory
          catagory="Books & Films"
          id = {1}
        />
        <Catagory
          catagory="Food"
          id = {2}
        />
        <Catagory
          catagory="History"
          id = {3}
        />
        <Catagory
          catagory="Short Stories"
          id = {4}
        />
        <Catagory
          catagory="Sports & Fitness"
          id= {5}
        />
        <Catagory
          catagory="Stuff You Should Know"
          id = {6}
        />
        <Catagory
          catagory="Technology"
          id = {7}
        />
        <Catagory
          catagory="What's Tending"
          id= {8}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer:{
    flexGrow : 1
  },
  container:{
    flex : 1,
    backgroundColor : 'white',
  }
});
