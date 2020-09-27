import React, { useState } from "react"

import {View,Text,StyleSheet,TextInput,TouchableOpacity,Keyboard} from "react-native"
import {useSelector} from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from "../constants/color-palete"
import {List} from "../components/List"
import {AudiosList1} from "../components/AudiosList1"

export const SearchPage = ({navigation})=>{
    const categories = useSelector(state=>state.categories.categories)
    const languages = useSelector(state=>state.languages.languages)
    const audios = useSelector(state=>state.audios.audios)
    const [searchResult,setSearchResult] = useState([])
    const [showResults,setShowResults] = useState(false)
    const [query,setQuery] = useState('')

    const handleChangeInQueryValue = (val:string)=>{
        setQuery(val)
        if(val!==''){
            const updatedData = audios.filter(item=>{
                const str1 = val.toUpperCase()
                const str2 = item.category.toUpperCase()
                const str3 = item.language.toUpperCase()
                return str2.includes(str1) || str3.includes(str1)
            })
        setSearchResult(updatedData)
        }else{
            setSearchResult([])
        }
    }

    const handleOnFocus = ()=>{
        setShowResults(true)
    }

    const handleClearSearchInput=()=>{
        Keyboard.dismiss()
        setQuery('')
        setShowResults(false)
        setSearchResult([])
    }

    return(
        <View style={styles.screen}>
            <View style={styles.queryInputContainer}>
                <AntDesign
                    name="search1"
                    size={20}
                    color={Colors.secondary}
                />
                <TextInput
                    textContentType="name"
                    value={query}
                    onChangeText={handleChangeInQueryValue}
                    placeholder="Search by category, language"
                    style={styles.queryInput}
                    onFocus={handleOnFocus}
                />
                {   showResults&&
                    <TouchableOpacity
                        onPress={handleClearSearchInput}
                        activeOpacity={0.5}
                    >
                        <AntDesign
                            name="close"
                            size={20}
                            color={Colors.secondary}
                        />
                    </TouchableOpacity>

                }
            </View>
            {
                showResults&&
                <View style={styles.queryResultContainer}>
                    <AudiosList1
                        data={searchResult}
                    />
                </View>
            }
            {
                !showResults&&
                <>
                    <View style={styles.categoriesContainer}>
                        <View style={styles.blockHeader}>
                            <Text style={styles.blockTitle}>Categories</Text>
                            <TouchableOpacity
                                onPress={()=>{ navigation.navigate("Categories Page")}}
                                style={styles.seeAllButtonContainer}
                            >
                                <Text style={styles.seeAllButton}>See all</Text>
                                <AntDesign name="right" size={15} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cardContainer}>
                            <List 
                                data={categories}
                                limit={6}
                                style={{height:94}}
                                navigation={navigation}
                            />
                        </View>   
                    </View>
                    <View style={styles.languagesContainer}>
                        <View style={styles.blockHeader}>
                            <Text style={styles.blockTitle}>Languages</Text>
                            <TouchableOpacity
                                onPress={()=>navigation.navigate("Languages Page")}
                                style={styles.seeAllButtonContainer}
                            >
                                <Text style={styles.seeAllButton}>See all</Text>
                                <AntDesign name="right" size={15} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cardContainer}>
                            <List 
                                data={languages}
                                limit={2}
                                style={{height:60}}
                                navigation={navigation}
                            />
                        </View>   
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        paddingTop:10,
        justifyContent:'space-between'
    },
    queryInputContainer:{
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:Colors.secondary,
        borderRadius:25
    },
    queryInput:{
        color:Colors.secondary,
        fontSize:16,
        textDecorationLine:'none',
        width:'80%',
        // borderWidth:1
    },
    queryResultContainer:{
        flex:1,
        width:'100%',
        // borderWidth:1,
        padding:10,
    },
    categoriesContainer:{
        width:'100%',
        height : '65%',
    },
    blockHeader:{
        width:'100%',
        // borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    blockTitle:{
        fontSize:18,
        fontWeight:'bold'
    },
    seeAllButtonContainer:{
        // borderWidth:1,
        flexDirection:'row',
        alignItems:'center'
    },
    seeAllButton:{
        // fontSize:15,
        marginRight:4,
    },
    languagesContainer:{
        width:'100%',
        height : '20%',
    },
    cardContainer:{
        // width:'100%',
        flex:1,
        paddingHorizontal:10,
        marginTop:10,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'white',
    }
})