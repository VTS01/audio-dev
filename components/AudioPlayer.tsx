import React,{useState,useEffect,useCallback} from 'react'

import {View, Text, StyleSheet, Image, TouchableNativeFeedback,TouchableWithoutFeedback,Alert} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {ProgressBar} from '@react-native-community/progress-bar-android';

import TrackPlayer from 'react-native-track-player';

export const AudioPlayer = ({track,setShowModal})=>{
    const [trackPlayerLoaded,setTrackPlayerLoaded] = useState(false)
    const [isPlaying,setIsPlaying] = useState(false)
    const [progress,setProgress] = useState(0)
    const [duration,setDuration] = useState(0)
    
    const start =useCallback(async () => {
        await TrackPlayer.setupPlayer();

        await TrackPlayer.add({
            id: track.key,
            url: track.url,
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: require('../assets/logo.jpg'),
            duration : 24,
        });

        const duration = await TrackPlayer.getDuration()
        setDuration(duration)

        setIsPlaying(true)
        await TrackPlayer.play();
    },[track]);

    useEffect(()=>{
       start()
    },[start])

    const handleShowModel = ()=>{
        setShowModal(false)
        setIsPlaying(false)
    }

    const handleTrackPlay = ()=>{
        TrackPlayer.play()
        setIsPlaying(true)
    }

    const handleTrackPause = ()=>{
        TrackPlayer.pause()
        setIsPlaying(false)
    }

    const backwardHandler = async()=>{
        const currentPosition = await TrackPlayer.getPosition()
        TrackPlayer.seekTo(currentPosition -10)
    }

    const forwardHandler = async()=>{
        const currentPosition = await TrackPlayer.getPosition()
        TrackPlayer.seekTo(currentPosition + 10)
    }

    return(
        <View style={styles.screen}> 
            <View style={styles.header}>
                <TouchableWithoutFeedback
                    onPress={handleShowModel}
                >
                    <AntDesign 
                        name = "arrowleft"
                        size = {24}
                        color = "black"
                    />
                </TouchableWithoutFeedback>
                <Text>PLAYING NOW</Text>
                <AntDesign 
                    name="infocirlceo" 
                    size={24} 
                    color="black" 
                />
            </View>
            <View style={styles.controlSection}>
                <View style={styles.trackCoverImageContainer}>
                    <Image
                        source={require('../assets/logo.jpg')}
                        style={styles.trackCoverImage}
                    ></Image>
                </View>
                <View style={styles.progressBarContainer}>
                    <Text>0:00</Text>
                    <ProgressBar
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={progress}
                    />
                    <Text>{(duration - duration%60)/60}:{(duration%60)}</Text>
                </View>
                <View style={styles.controlButton}>
                    <TouchableWithoutFeedback
                        onLongPress={backwardHandler}
                    >
                        <AntDesign 
                            name="banckward" 
                            size={20} 
                            color="black" 
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={isPlaying ? handleTrackPause : handleTrackPlay}
                    >
                        <View style={styles.playButtonContainer}>
                            <AntDesign 
                                name={isPlaying ? "pausecircleo" : "playcircleo"} 
                                size={38} 
                                color="black" 
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onLongPress={forwardHandler}
                    >
                        <AntDesign 
                            name="forward" 
                            size={20} 
                            color="black" 
                        />
                    </TouchableWithoutFeedback>
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
        alignItems : 'center'
    },
    controlSection : {
        width : '90%',
        height : '80%',
        // borderWidth : 1,
        display : 'flex',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    trackCoverImageContainer:{
        width : '50%',
        height : '35%',
        borderRadius : 20,
        overflow : 'hidden',
        elevation : 5,
    },
    trackCoverImage:{
        width : '100%',
        height : '100%',
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
    progressBarContainer:{
        width : '80%',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    }
})