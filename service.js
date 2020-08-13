
import TrackPlayer from 'react-native-track-player'

const serviceProvider = async()=>{
        TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())

        TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    
        TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

        // TrackPlayer.addEventListener('remote-seek',(pos)=> TrackPlayer.seekTo(pos))
}

export default serviceProvider;
