
import TrackPlayer from 'react-native-track-player'

const serviceProvider = async()=>{
        TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())

        TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
    
        TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
        
        TrackPlayer.addEventListener('remote-jump-forward', async () => {
                const currentPosition = await TrackPlayer.getPosition()
                TrackPlayer.seekTo(currentPosition + 10)
        });

        TrackPlayer.addEventListener('remote-jump-backward', async () => {
                const currentPosition = await TrackPlayer.getPosition()
                if(currentPosition<=10){
                        TrackPlayer.seekTo(0)
                }else{
                        TrackPlayer.seekTo(currentPosition - 10)
                }
        });

        TrackPlayer.addEventListener('remote-next',()=>{
            TrackPlayer.skipToNext()
        })

        TrackPlayer.addEventListener('remote-previous',()=>{
                TrackPlayer.skipToPrevious()
        })
}

export default serviceProvider;
