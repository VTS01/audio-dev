import React from 'react'

import {View, Text, StyleSheet} from 'react-native'

import Slider from '@react-native-community/slider'
import TrackPlayer,{STATE_STOPPED} from 'react-native-track-player';

export class MusicProgressBar extends TrackPlayer.ProgressComponent {
    returnDuration = (seconds:number)=>{
        const duration = new Date(seconds * 1000).toISOString().substr(14, 5);
        return duration
    }

    

    render() {
        const  {setIsPlaying,setIsStopped} = this.props
        TrackPlayer.getState().then(function(state){
            if(state === STATE_STOPPED){
             setIsPlaying(false)
             setIsStopped(true)
            }
        })
        
        return (
            <View style={styles.progressBarContainer}>
                <Text>{this.returnDuration(parseInt(this.state.position.toFixed()))}</Text>
                <View style={styles.progressBar}>
                    <Slider
                        style={{width:'100%'}} 
                        value={this.getProgress()*this.state.duration}
                        step={.1}
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        onSlidingComplete={this.props.sliderHandler}
                    />
                </View>
                <Text>{this.returnDuration(this.state.duration)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    progressBar:{
        width : '70%',
    },
    progressBarContainer:{
        width : '80%',
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },  
})