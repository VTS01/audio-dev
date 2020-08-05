import React,{useState,useEffect,useCallback} from 'react'

import {View, Text, StyleSheet, Image ,TouchableWithoutFeedback,Alert} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {ProgressBar} from '@react-native-community/progress-bar-android';

import TrackPlayer from 'react-native-track-player';

class MyPlayerBar extends TrackPlayer.ProgressComponent {
    render() {
        return (
            <View style={styles.progressBarContainer}>
                <Text>0:{this.state.position.toFixed()}</Text>
                <View style={styles.progressBar}>
                    <ProgressBar
                        color="red"
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={this.getProgress()}
                    />
                </View>
                <Text>{this.state.duration - this.state.duration%60}:{this.state.duration%60}</Text>
            </View>
        );
    }
    
}

export const AudioPlayer = ({track,setShowModal})=>{
    const [trackPlayerLoaded,setTrackPlayerLoaded] = useState(false)
    const [isPlaying,setIsPlaying] = useState(false)
    const [progress,setProgress] = useState(.2)
    const [duration,setDuration] = useState(0)
    const [currentTrack,setCurrentTrack] = useState<{}>()
    
    const start =useCallback(async () => {
        try{
            await TrackPlayer.setupPlayer();
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

    const nextTrackHandler = async ()=>{
        try{
            await TrackPlayer.skipToNext()
            const currTrackId = await TrackPlayer.getCurrentTrack()
            const currTrackObj = await TrackPlayer.getTrack(currTrackId)
            setCurrentTrack(currTrackObj)
        }
        catch(err){
            Alert.alert(`${err.message}`)
        }
    }

    const previousTrackHandler = async ()=>{
        try{
            await TrackPlayer.skipToPrevious()
            const currTrackId = await TrackPlayer.getCurrentTrack()
            const currTrackObj = await TrackPlayer.getTrack(currTrackId)
            setCurrentTrack(currTrackObj)
        }
        catch(err){
            Alert.alert(`${err.message}`)
        }
    }

    // TrackPlayer.

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
                <Text style={styles.headerText}>PLAYING NOW</Text>
                <AntDesign 
                    name="infocirlceo" 
                    size={24} 
                    color="black" 
                />
            </View>
            <View style={styles.controlSection}>
                <View style={styles.trackCoverImageContainer}>
                    <Image
                        source={{uri : track.artwork}}
                        style={styles.trackCoverImage}
                    ></Image>
                </View>
                <View style={styles.trackDetailsContainer}>
                    <Text style={styles.trackTitle}>Title</Text>
                    <Text style={styles.trackArtist}>Artist</Text>
                </View>
                <MyPlayerBar />
                <View style={styles.controlButton}>
                    <TouchableWithoutFeedback
                        onLongPress={backwardHandler}
                        onPress={previousTrackHandler}
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
                        onPress={nextTrackHandler}
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
        width : '55%',
        height : '40%',
        borderRadius : 20,
        overflow : 'hidden',
        elevation : 5,
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
    progressBarContainer:{
        width : '80%',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
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
    progressBar:{
        width : '70%',
    }
})