import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNfetchBlob from 'rn-fetch-blob';

import Colors from '../constants/color-palete';
import {Card} from './Card';
import {AudioPlayer} from './AudioPlayer';
import {PermissionsAndroid} from 'react-native';

// const defaultUserAvatar

export const AudiosList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState();

  const handlePlayButtonClick = (track: unknown) => {
    setSelectedTrack(track);
    setShowModal(true);
  };

  const handleDownloadButtonClick = async (url: any, filename: string) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const {fs} = RNfetchBlob;
      const downloadDirectory = fs.dirs.DownloadDir;
      const path = `${downloadDirectory}/${filename}`;
      RNfetchBlob.config({
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          description: 'Downloading.',
          path: path,
        },
      })
        .fetch('GET', url)
        .then(() => {
          console.log('Downloaded');
        })
        .catch((err) => {
          Alert.alert('Error', `${err.message}`, [
            {
              text: 'Ok',
              style: 'default',
            },
          ]);
        });
    } else {
      Alert.alert(
        'Permission Denied!',
        'You need to give storage permission to download the file',
      );
    }
  };

  const returnDuration = (seconds: number) => {
    const duration = new Date(seconds * 1000).toISOString().substr(14, 5);
    return duration;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <Card>
              <View style={styles.item}>
                <View style={styles.imgContainer}>
                  <Image
                    source={{uri: item.artwork}}
                    style={styles.audioImage}
                    // source={require('../assets/catagories/art-and-culture.jpg')}
                  />
                </View>
                <View style={styles.durationContainer}>
                  <AntDesign
                    name="clockcircleo"
                    size={15}
                    color="black"
                    style={styles.clockIcon}
                  />
                  <Text style={styles.durationText}>
                    {returnDuration(item.duration)}
                  </Text>
                </View>
              </View>
              <Text style={styles.audioDescription}>{item.title}</Text>
              <View style={styles.creatorInfoContainer}>
                <View style={styles.creatorAvatarContainer}>
                  <Image
                    source={
                      item.userAvatar === null
                        ? require('../assets/profile-icon.jpg')
                        : {uri: item.userAvatar}
                    }
                    style={styles.creatorAvatar}
                  />
                </View>
                <View style={styles.nameAndSourceNameContainer}>
                  <Text style={styles.sourceName}>{item?.site || '--'}</Text>
                  <Text style={styles.creatorName}>By {item.artist}</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handlePlayButtonClick(item)}>
                  <AntDesign
                    name="caretright"
                    size={20}
                    color="black"
                    style={styles.playButton}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleDownloadButtonClick(item.url, item.title)
                  }>
                  <AntDesign
                    name="arrowdown"
                    size={20}
                    color="black"
                    style={styles.downloadButton}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          );
        }}
      />
      <Modal visible={showModal} animationType="slide">
        <AudioPlayer setShowModal={setShowModal} track={selectedTrack} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  audioImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
  },
  clockIcon: {
    marginRight: 8,
  },
  durationText: {
    color: 'black',
  },
  durationContainer: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    position: 'absolute',
    left: 10,
    bottom: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  audioDescription: {
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    textTransform: 'capitalize',
  },
  creatorInfoContainer: {
    borderWidth: 2,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  creatorAvatarContainer: {
    overflow: 'hidden',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  creatorAvatar: {
    width: '100%',
    height: '100%',
  },
  sourceName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  creatorName: {
    fontSize: 14,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  playButton: {
    marginRight: 5,
  },
  downloadButton: {
    marginLeft: 5,
  },
});
