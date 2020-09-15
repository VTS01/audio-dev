import React,{useCallback,useState,useEffect} from "react";

import { View, Text, StyleSheet, Image, Alert, Modal} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign'

import {useSelector} from "react-redux"
import Colors from "../../constants/color-palete";
import { Card } from "../Card";
import {CategoriesMap} from '../../Data/CategoriesMap'
import {AudioPlayer} from '../AudioPlayer'

export const Catagory = ({catagory, dbname}) => {
  const audiosData = useSelector(state => state.audios.audios) 
  const [showModal, setShowModal] = useState(false)
  const [selectedTrack,setSelectedTrack] = useState()

  // const category = catagory;
  // const categoryId = id;
  // const categoryDbMap = CategoriesMap[categoryId]

  const audios = audiosData.filter((item: { category: string; }) => item.category === dbname && item.status === 'publish')

  if(audios.length===0){
    return null
  }  


  return (
    <View style={styles.catagory}>
      <Text style={styles.catagoryTitle}>{catagory}</Text>
      <FlatList
        data={audios}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card 
            item={item}
            setShowModal = {setShowModal}
            setSelectedTrack = {setSelectedTrack}
            >
            <View style={styles.item}>
              <Image
                source={{uri : item.artwork}}
                style={{ height: '100%', width: '100%' }}
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
      <Modal
        visible={showModal}
        animationType="slide"
      >
        <AudioPlayer
          setShowModal = {setShowModal}
          track = {selectedTrack}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  catagory:{
    width : '100%',
    marginBottom : 10,
  },
  contentContainer: {
  },
  catagoryTitle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "500",
    textTransform:'capitalize'
  },
  item: {
    flex:1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  playButton: {
    right: 30,
    bottom : 4,
    color: Colors.background,
  },
});
