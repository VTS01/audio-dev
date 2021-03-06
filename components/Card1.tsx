import React from "react"

import {View,Text,StyleSheet,TouchableOpacity} from "react-native"

export const  Card1 = ({item,style,navigation})=>{
    const handleClick = ()=>{
        navigation.navigate("Audios Page",{
            item:item
        })
    }
    
    return(
        <TouchableOpacity 
            style={{...styles.card,...style}}
            onPress={handleClick}
        >
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width:'47%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        elevation:5,
        marginHorizontal:6,
        marginVertical:6
    },
    name:{
        fontSize:15
    }
})
