
import TrackPlayer from 'react-native-track-player'

const serviceProvider = async()=>{
        TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())

        TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    
        TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

}

export default serviceProvider;
