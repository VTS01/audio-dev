// import { DrawerItem } from "@react-navigation/drawer"
import React,{useState} from "react"

import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,Modal,Alert} from "react-native"
import RNfetchBlob from "rn-fetch-blob"
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from "../constants/color-palete"
import {AudioPlayer} from "../components/AudioPlayer"

export const AudiosList1 = ({data})=>{
    const [showModal, setShowModal] = useState(false)
    const [selectedTrack,setSelectedTrack] = useState()

    const handlePlayButtonClick = (track: unknown)=>{
        setSelectedTrack(track)
        setShowModal(true)
    }

    const handleDownloadButtonClick = (url: any,filename:string)=>{
        const {fs} = RNfetchBlob
        const downloadDirectory = fs.dirs.DownloadDir
        const path = `${downloadDirectory}/${filename}`

        RNfetchBlob.config({
            fileCache:false,
            addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                description : 'Downloading.',
                path : path,
            }
        })
        .fetch("GET",url)
        .then((res)=>{console.log("Downloaded")})
        .catch((err)=>{
            Alert.alert(
                "Error",
                `${err.message}`,
                [{
                    text:'Ok',
                    style:"default"
                }]
            )
        })
    }


    if(data.length===0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.message}>No match found!</Text>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Results</Text>
            </View>
            <FlatList
                keyExtractor={item => item.id}
                data={data}
                renderItem={({item})=>(
                  <View style={styles.card}>
                      <View style={styles.coverImageContainer}>
                        <Image
                            source={{uri : item.artwork}}
                            style={{ height: '100%', width: '100%' }}
                        ></Image>
                      </View>
                      <View style={styles.musicDetails}>
                        <Text style={styles.songName}>{item.title}</Text>
                        <Text style={styles.artistName}>By {item.artist}</Text>
                      </View>
                      <View style={styles.buttonContainer}>
                      <TouchableOpacity
                            onPress={()=>handlePlayButtonClick(item)}
                        >
                            <AntDesign
                                name="caretright"
                                size={20}
                                color="black"
                                style={styles.playButton}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>handleDownloadButtonClick(item.url,item.title)}
                        >
                            <AntDesign
                                name="arrowdown"
                                size={20}
                                color="black"
                                style={styles.downloadButton}
                            />
                        </TouchableOpacity>
                      </View>
                  </View>  
                )}
            />
            <Modal
                visible={showModal}
                animationType="slide"
            >
                <AudioPlayer
                    setShowModal = {setShowModal}
                    track = {selectedTrack}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    message:{
        color:Colors.menu,
        fontSize:18,
        fontWeight:'bold'
    },
    titleContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        fontSize:22,
        fontWeight:'bold',
        color:Colors.secondary
    },
    card:{
        // borderWidth:1
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'white'
    },
    coverImageContainer:{
        width:50,
        height:50,
        // borderWidth:1,
        borderRadius:5,
        overflow:'hidden',
        marginRight:20
    },
    songName:{
        fontSize:16,
        textTransform:'capitalize'
    },
    artistName:{
        color:Colors.menu
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        position:'absolute',
        right:4,
    },
    playButton:{
        marginRight:5,
    },
    downloadButton:{
        marginLeft:5,
    }
})