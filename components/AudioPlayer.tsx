import React,{useState,useEffect,useCallback} from 'react'

import {View, Text, StyleSheet, Image ,Alert,TouchableOpacity,Share} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TrackPlayer from 'react-native-track-player';

import {MusicProgressBar} from './AudioPlayerProgressBar'

export const AudioPlayer = ({track,setShowModal})=>{
    const [trackPlayerLoaded,setTrackPlayerLoaded] = useState(false)
    const [isPlaying,setIsPlaying] = useState(false)
    const [playerStopped,setIsStopped] = useState(true)
    
    const start =useCallback(async () => {
        try{
            await TrackPlayer.setupPlayer();
            TrackPlayer.updateOptions({
                stopWithApp: true,
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SEEK_TO,
                    TrackPlayer.CAPABILITY_JUMP_FORWARD,
                    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                ],
                compactCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_JUMP_FORWARD,
                    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                ],
                notificationCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SEEK_TO,
                    TrackPlayer.CAPABILITY_JUMP_FORWARD,
                    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                ],
                jumpInterval: 10
            });
            setTrackPlayerLoaded(true)
        }catch(err){
            Alert.alert(
                'SET PLAYER',
                `${err.message}`)
        }

        try{       
            await TrackPlayer.add(track);
        }catch(err){
            Alert.alert(
                'Add Track',
                `${err.message}`
                )
        }

        setIsPlaying(true)
        await TrackPlayer.play();
        setIsStopped(false)
    },[track]);

    useEffect(()=>{
       start()
    },[start])

    const handleShowModel = ()=>{
        setShowModal(false)
        setIsPlaying(false)
    }

    const handleTrackPlay = async ()=>{
        await TrackPlayer.play()
        setIsPlaying(true)
    }

    const handleTrackPause = ()=>{
        TrackPlayer.pause()
        setIsPlaying(false)
    }

    const backwardHandler = async()=>{
        const currentPosition = await TrackPlayer.getPosition()
        if(currentPosition<=10){
            TrackPlayer.seekTo(0)
        }else{
            TrackPlayer.seekTo(currentPosition - 10)
        }
    }

    const forwardHandler = async()=>{
        const currentPosition = await TrackPlayer.getPosition()
        TrackPlayer.seekTo(currentPosition + 10)
    }

    // const nextTrackHandler = async ()=>{
    //     try{
    //         await TrackPlayer.skipToNext()
    //         const currTrackId = await TrackPlayer.getCurrentTrack()
    //         const currTrackObj = await TrackPlayer.getTrack(currTrackId)
    //         setCurrentTrack(currTrackObj)
    //     }
    //     catch(err){
    //         Alert.alert(`${err.message}`)
    //     }
    // }

    // const previousTrackHandler = async ()=>{
    //     try{
    //         await TrackPlayer.skipToPrevious()
    //         const currTrackId = await TrackPlayer.getCurrentTrack()
    //         const currTrackObj = await TrackPlayer.getTrack(currTrackId)
    //         setCurrentTrack(currTrackObj)
    //     }
    //     catch(err){
    //         Alert.alert(`${err.message}`)
    //     }
    // }

    const sliderHandler = (value:number)=>{
        TrackPlayer.seekTo(value)
        // setIsPlaying(true)
    }

    TrackPlayer.addEventListener('remote-play', () => {
        handleTrackPlay()
    });
    
    TrackPlayer.addEventListener('remote-pause', () => {
    handleTrackPause()
    });

    const handleShareButtonClick = async (url: string)=>{
        try{
           const result = await Share.share({
                message : "Listen to this wonderful work.",
                url:url,
                title:"Mello",
            })
            console.log(result.action);
            
            if(result.action === Share.sharedAction){
                if(result.activityType){
                    console.log(result.activityType);
                }
                else{
                    console.log('shared');
                }
            }else if(result.action===Share.dismissedAction){
                console.log("not shared");
            }
        }catch(err){
            console.log(err);
        }
    }
    

    return(
        <View style={styles.screen}> 
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={handleShowModel}
                >
                    <AntDesign 
                        name = "down"
                        size = {24}
                        color = "black"
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>PLAYING NOW</Text>
                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={()=>handleShareButtonClick()}
                >
                    <FontAwesome 
                        name="share-alt" 
                        size={24} 
                        color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.controlSection}>
                <View style={styles.trackCoverImageContainer}>
                    <Image
                        source={require('../assets/logo1.jpg')}
                        style={styles.trackCoverImage}
                    ></Image>
                </View>
                <View style={styles.trackDetailsContainer}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                    <Text style={styles.trackArtist}>{track.artist}</Text>
                </View>
                <MusicProgressBar 
                    sliderHandler = {sliderHandler}
                    setIsPlaying = {setIsPlaying}
                    setIsStopped = {setIsStopped}
                />
                <View style={styles.controlButton}>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={backwardHandler}
                    >
                        <MaterialIcons 
                            name="replay-10" 
                            size={30} 
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={isPlaying ? handleTrackPause : handleTrackPlay}
                    >
                        <View style={styles.playButtonContainer}>
                            <AntDesign 
                                name={isPlaying ? "pausecircleo" : "playcircleo"} 
                                size={38} 
                                color="black" 
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={forwardHandler}
                    >
                        <MaterialIcons 
                            name="forward-10" 
                            size={30} 
                            color="black" 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        backgroundColor : 'white',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingVertical : 30,
    },
    header:{
        width : '90%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    headerText:{
        fontSize : 20,
        fontWeight :'700',
        color : 'black'
    },
    controlSection : {
        width : '90%',
        height : '85%',
        // borderWidth : 1,
        display : 'flex',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    trackCoverImageContainer:{
        width : '70%',
        height : '50%',
        borderRadius : 20,
        overflow : 'hidden',
        elevation : 5,
        backgroundColor:'white'
    },
    trackCoverImage:{
        width : '100%',
        height : '100%',
        // transform : 
    },
    controlButton:{
        width : '70%',
        // borderWidth : 1,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    playButtonContainer:{
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    trackDetailsContainer:{
        width : '100%',
        // borderWidth : 1,
        display :'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    trackTitle:{
        fontSize : 25,
        fontWeight : '700'
    },
    trackArtist:{
        fontSize : 18,
        fontWeight : '400',
        color : '#bbb'
    },
})