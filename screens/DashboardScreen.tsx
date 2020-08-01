import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Button, Modal} from 'react-native';
import Colors from '../constants/color-palete';

import * as Progress from 'react-native-progress';

import {FileInput} from '../components/FileInput';

export const DashboardScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log('Dashboard navigation: ', navigation);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Progress.Bar progress={progress} width={200} />,
    });
  }, [progress]);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.albumImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Publish on Mello</Text>
        <Text style={styles.tag}>Upload your audio</Text>
        <Button
          title="Start Uploading"
          onPress={() => setShowModal(true)}
          color={Colors.primary}
        />
      </View>
      <Modal visible={showModal} animationType="slide">
        <FileInput setShowModal={setShowModal} updateProgress={setProgress} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumImage: {
    width: 300,
    height: 200,
    backgroundColor: Colors.logobackground,
    borderWidth: 1,
    marginVertical: 30,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    color: Colors.danger,
    fontSize: 30,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  tag: {
    fontSize: 18,
    marginVertical: 15,
  },
});
