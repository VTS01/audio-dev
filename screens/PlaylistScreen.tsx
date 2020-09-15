import React,{useState,useEffect,useCallback} from "react";

import firestore from '@react-native-firebase/firestore';
import {View ,StyleSheet,Alert, ActivityIndicator,RefreshControl} from "react-native";
import {useDispatch,useSelector} from "react-redux"
import { ScrollView } from "react-native-gesture-handler";

import { Catagory } from "../components/catagories/Catagory";
import {setAudios} from  "../store/actions/audiosActions"
import {setCategories} from "../store/actions/categoriesActions"
import {setLanguages} from "../store/actions/languagesActions"
import Colors from "../constants/color-palete"

export const PlaylistScreen = () => {
  const [showSpinner,setShowSpinner] = useState(false)
  const [isRefreshing,setIsRefreshing] = useState(false)
  const categories = useSelector(state => state.categories.categories)

  const dispatch = useDispatch()

  const fetchData = useCallback(async()=>{
    setIsRefreshing(true)
    
    const data:{}[] = []
    const languages:{}[] = []
    const categories:{}[] = []
    const collRef = firestore().collection(`mello/data/audios`)
    const collRef1 = firestore().collection(`mello/data/languages`)
    const collRef2 = firestore().collection(`mello/data/categories`).orderBy("name","asc")

    try{
      const snapShot = await collRef.get()
      const snapShot1 = await collRef1.get()
      const snapShot2 = await collRef2.get()
      snapShot.forEach(snap=>{
        if(snap.exists){
          data.push({
              key : snap.id,
              id : snap.id,
              url : snap.data().audiourl,
              title : snap.data().name,
              artist : snap.data().author.name,
              artwork : snap.data().audiocoverurl,
              duration : snap.data().duration,
              category : snap.data().category,
              status : snap.data().status
            })
        }
        else{
          Alert.alert(
            'Error!!!',
            "Document not found"
          )
        }
      })

      snapShot1.forEach(snap=>{
        if(snap.exists){
          languages.push({
            id : snap.id,
            data : snap.data().name
          })
        }
        else{
          Alert.alert(
            'Error!!!',
            "Document not found"
          )
        }
        })

      snapShot2.forEach(snap=>{
        if(snap.exists){
          categories.push({
            id : snap.id,
            name : snap.data().name,
            dbname : snap.data().dbname
          })
        }
        else{
          Alert.alert(
            'Error!!!',
            "Document not found"
          )
        }    
      })

      }
    catch(err){
      console.error(err)
    }
      dispatch(setAudios(data))
      dispatch(setCategories(categories))
      dispatch(setLanguages(languages))
      setIsRefreshing(false)
    }
  ,[dispatch])

  useEffect(() =>{
    setShowSpinner(true)
    fetchData().then(function(){
      setShowSpinner(false)
    })
  },[fetchData])

  if(showSpinner){
    return(
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={Colors.menu} size={50}/>
      </View>
    )
  }

  return (
    <ScrollView 
      style={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl 
          refreshing={isRefreshing}
          onRefresh={fetchData}
        />
      }
      >
      <View style={styles.container}>
        {
          categories.map(({id,name,dbname})=>{
            return(
              <Catagory
                catagory={name}
                dbname={dbname}
                key = {id}
            />              
            )
          })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer:{
    flexGrow : 1,
    backgroundColor : 'white',
  },
  container:{
    flex : 1,
  },
  loaderContainer :{
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
});
