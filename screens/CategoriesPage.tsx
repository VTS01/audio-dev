import React from "react"

import {View,Text,StyleSheet} from "react-native"
import {useSelector} from "react-redux"

import {List} from "../components/List"

export const CategoriesPage = ({navigation})=>{
    const categories = useSelector(state=>state.categories.categories)
    const limit = categories.length
    return(
        <View style={styles.screen}>
            <List 
                data={categories}
                limit={limit}
                style={{height:100}}
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