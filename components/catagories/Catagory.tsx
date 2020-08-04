import React,{useCallback,useState,useEffect} from "react";

import { View, Text, StyleSheet, Image, Alert, Modal, ActivityIndicator} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';

import Colors from "../../constants/color-palete";
import { Card } from "../Card";
import {CategoriesMap} from '../../Data/CategoriesMap'
import {AudioPlayer} from '../AudioPlayer'

export const Catagory = ({catagory, id, imageSource}) => {
  const [dbData,setDbData] = useState<{}[]>()
  const [showModal, setShowModal] = useState(false)
  const [selectedTrack,setSelectedTrack] = useState()

  const category = catagory;
  const categoryId = id;
  const categoryDbMap = CategoriesMap[categoryId]

  const handleDataChange = (data:{}[])=>{
    setDbData(data)
  }

  const fetchData = useCallback(async()=>{
    const data:{}[] = []
    const collRef = firestore().collection(`mello/audio/languages/english/${categoryDbMap}`)
    try{
      const snapShot = await collRef.get()
      snapShot.forEach(snap=>{
        if(snap.exists){
          data.push({
              key : snap.id,
              name : snap.data().name,
              url : snap.data().url
            })
        }
        else{
          Alert.alert(
            'Err'
          )
          console.log("Document not found")
        }
      })
      }
    catch(err){
      console.error(err)
    }
     handleDataChange(data)
    }
  ,[])

  useEffect(() =>{
    fetchData()
  },[fetchData])

  return (
    <View style={styles.catagory}>
      <Text style={styles.catagoryTitle}>{category}</Text>
      <FlatList
        data={dbData}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card 
            item={item}
            setShowModal = {setShowModal}
            setSelectedTrack = {setSelectedTrack}
            >
            <View style={styles.item}>
              <Image
                source={imageSource}
                style={{ height: 115, width: 115 }}
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
