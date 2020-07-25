import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/color-palete";
import { Card } from "../Card";

export const Catagory = (props) => {
  return (
    <View style={styles.catagory}>
      <Text style={styles.catagoryTitle}>{props.catagory}</Text>
      <FlatList
        data={props.data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card item={item}>
            <View style={styles.item}>
              <Image
                source={props.imageSource}
                style={{ height: 130, width: 130 }}
              ></Image>
              <AntDesign
                name="playcircleo"
                size={24}
                color="black"
                style={styles.playButton}
              />
            </View>
          </Card>
        )}
        horizontal={true}
        style={styles.contentContainer}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  catagory:{
    width : '100%',
    height: '15%',
    // borderWidth : 1
  },
  contentContainer: {
    backgroundColor: Colors.background,
  },
  catagoryTitle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
    backgroundColor: Colors.background,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  playButton: {
    right: 30,
    color: Colors.background,
  },
});
