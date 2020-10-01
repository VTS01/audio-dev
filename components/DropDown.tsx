import React from 'react'
import {View, Text, TouchableNativeFeedback, StyleSheet, ScrollView,TouchableWithoutFeedback} from 'react-native'
import { Screen } from 'react-native-screens'

export const DropDown = ({data,setSelectedItem,label,closeDropDown})=>{
    return(
        <TouchableWithoutFeedback
            onPress={closeDropDown}
        >
            <View style={styles.screen}>
                <View style={styles.dropdownContainer} >
                    <View style={styles.dropdownHeading}>
                        <Text style={styles.dropdownHeadingText}>Select {label}</Text>
                    </View>
                    <ScrollView>
                    {
                        data.map(item =>{
                            return(
                                <TouchableNativeFeedback 
                                    key={item.id} 
                                    onPress={()=>setSelectedItem(item.name)}>
                                        <View  style={styles.dropdownListItem}>
                                            <Text style={styles.dropdownListItemText}>{item.name}</Text>
                                        </View>
                                </TouchableNativeFeedback>
                            )
                        })
                    }
                    </ScrollView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
} 

const styles = StyleSheet.create({
    screen:{
        width:'100%',
        height:'100%',
        position:'absolute',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)',
        elevation:10,
        // zIndex:10
    },
    dropdownContainer : {
        width : '80%',
        height : '60%',
        backgroundColor : 'white',
        justifyContent : 'center',
        elevation:10,
        shadowOffset : {
            width : 2,
            height : 2
        },
        shadowColor : 'black',
        shadowOpacity : .5,
    },
    dropdownListItem:{
        padding : 12,
        backgroundColor : 'white',
        elevation : 2,
        marginBottom : 1
    },
    dropdownListItemText:{
        fontSize : 15,
    },
    dropdownHeading : {
        width : '100%',
        height : 50,
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 3,
        backgroundColor : 'white'
    },
    dropdownHeadingText:{
        fontSize : 18,
        fontWeight:'700'
    },
})