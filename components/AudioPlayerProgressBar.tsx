import React from 'react'

import {View, Text, StyleSheet} from 'react-native'

import Slider from '@react-native-community/slider'
import TrackPlayer from 'react-native-track-player';

export class MusicProgressBar extends TrackPlayer.ProgressComponent {
    progress = parseInt(this.state.position.toFixed()) - parseInt(this.state.position.toFixed())%60 + ':'  + parseInt(this.state.position.toFixed())%60
    render() {
        return (
            <View style={styles.progressBarContainer}>
                <Text>{parseInt(this.state.position.toFixed()) - parseInt(this.state.position.toFixed())%60 + ':'  + parseInt(this.state.position.toFixed())%60}</Text>
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
                <Text>{this.state.duration - this.state.duration%60}:{this.state.duration%60}</Text>
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