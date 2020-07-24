import React from 'react'
import {View, Text, TouchableNativeFeedback, StyleSheet, ScrollView} from 'react-native'
import {CategoryList} from '../Data/CategoriesList'

export const CategoryDropDown = (props)=>{
    return(
        <View style={styles.CategoryList} >
            <View style={styles.dropdownHeading}>
                <Text style={styles.dropdownHeadingText}>Select Category</Text>
            </View>
            <ScrollView>
            {
                CategoryList.map(category=>{
                    return(
                        <TouchableNativeFeedback 
                            key={category.id} 
                            onPress={()=>props.setCategoryName(category.type)}>
                                <View  style={styles.CategoryListItem}>
                                    <Text style={styles.CategoryListItemText}>{category.type}</Text>
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
    CategoryList : {
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
    CategoryListItem:{
        padding : 12,
        backgroundColor : 'white',
        elevation : 2,
        marginBottom : 1
    },
    CategoryListItemText:{
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