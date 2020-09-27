import React from "react"

import {View,Text,StyleSheet} from "react-native"
import {useSelector} from "react-redux"

import {List} from "../components/List"

export const LanguagesPage = ({navigation})=>{
    const languages = useSelector(state=>state.languages.languages)
    const limit = languages.length
    return(
        <View style={styles.screen}>
            <List 
                data={languages}
                limit={limit}
                style={{height:60}}
                navigation={navigation}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white'
    }
})