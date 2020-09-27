import React,{useEffect} from "react"

import {View,Text,StyleSheet} from "react-native"
import {useSelector} from "react-redux"

import {AudiosList} from "../components/AudiosList"

export const AudiosPage=({navigation,route})=>{
    const {name,dbname} = route.params.item
    // const filterParam = dbname
    let currentList

    const audios = useSelector(state=>state.audios.audios)
    if(dbname==='not-assigned'){
        currentList = audios.filter(item=>item.language === name)
    }else{
        currentList = audios.filter(item=>item.category === name)
    }

    useEffect(()=>{
        navigation.setOptions({
            title:name
        })
    },[name])

    if(currentList.length===0){
        return(
            <View style={styles.message}>
                <Text>No Audios!!</Text>
            </View>
        )
    }

    return(
        <AudiosList
            data = {currentList}
        />
    )
}


const styles = StyleSheet.create({
    message:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    }
})
