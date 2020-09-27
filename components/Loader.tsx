import React from "react"

import {View,StyleSheet,ActivityIndicator} from "react-native"

import Colors from "../constants/color-palete" 

export const Loader = ()=>{
    return(
        <View style={styles.loaderContainer}>
            <View style={styles.loader}>
            <ActivityIndicator color={Colors.menu} size={50}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer:{
        width:'100%',
        height:'100%',
        position:'absolute',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,.5)',
        elevation:10,
      },
      loader:{
        width:200,
        height:100,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
      }
})
