import React from "react";

import { StyleSheet} from "react-native";
import { Catagory } from "../components/catagories/Catagory";
import { ScrollView } from "react-native-gesture-handler";

export const PlaylistScreen = () => {

  return (
    <ScrollView>
      <Catagory
        catagory="Art & Culture"
        id = {0}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Books & Films"
        id = {1}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Food"
        id = {2}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="History"
        id = {3}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Short Stories"
        id = {4}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Sports & Fitness"
        id= {5}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Stuff You Should Know"
        id = {6}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Technology"
        id = {7}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="What's Tending"
        id= {8}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
