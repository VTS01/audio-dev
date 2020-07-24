import React from "react";
import { StyleSheet } from "react-native";
import { Catagory } from "../components/catagories/Catagory";
import { ScrollView } from "react-native-gesture-handler";

export const PlaylistScreen = () => {
  const data = [
    {
      text: "Catagory 1",
      key: "qwe",
    },
    {
      text: "Catagory 2",
      key: "sad",
    },
    {
      text: "Catagory 3",
      key: "rty",
    },
    {
      text: "Catagory 4",
      key: "xcv",
    },
    {
      text: "Catagory 5",
      key: "345",
    },
  ];

  return (
    <ScrollView>
      <Catagory
        catagory="Art & Culture"
        data={data}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="History"
        data={data}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Science"
        data={data}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="Food"
        data={data}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
      <Catagory
        catagory="What's Tending"
        data={data}
        imageSource={require("../assets/catagories/art-and-culture.jpg")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
