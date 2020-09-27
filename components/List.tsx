import React from "react"

import {View,Text,FlatList,StyleSheet} from 'react-native'

import {Card1} from "./Card1"

export const List = ({data,limit,style,navigation})=>{
    const dataList = data.slice(0,limit)
    return(
        <View style={styles.listContainer}>
            <FlatList
                data={dataList}
                keyExtractor={item=>item.id}
                numColumns={2}
                renderItem={({item})=>(
                    <Card1
                        style={style}
                        item={item}
                        navigation={navigation}
                    />)
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer:{
        flex:1,
        flexDirection:'row',
    },

    list:{
        flex:1,
        justifyContent:'space-around',
    },
})