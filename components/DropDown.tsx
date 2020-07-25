import React from 'react'
import {View, Text, TouchableNativeFeedback, StyleSheet, ScrollView} from 'react-native'

export const DropDown = ({data,setSelectedItem,label})=>{
    return(
        <View style={styles.dropdownContainer} >
            <View style={styles.dropdownHeading}>
                <Text style={styles.dropdownHeadingText}>Select {label}</Text>
            </View>
            <ScrollView>
            {
                data.map(item=>{
                    return(
                        <TouchableNativeFeedback 
                            key={item.id} 
                            onPress={()=>setSelectedItem(item.type)}>
                                <View  style={styles.dropdownListItem}>
                                    <Text style={styles.dropdownListItemText}>{item.type}</Text>
                                </View>
                        </TouchableNativeFeedback>
                    )
                })
            }
            </ScrollView>
        </View>
    )
} 

const styles = StyleSheet.create({
    dropdownContainer : {
        width : '90%',
        height : '58%',
        backgroundColor : 'white',
        position : 'absolute',
        left:'5%',
        top:'20%',
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