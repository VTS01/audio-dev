import React, {useState, useEffect, useCallback} from 'react';

import firestore from '@react-native-firebase/firestore';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {Catagory} from '../components/catagories/Catagory';
import {setAudios} from '../store/actions/audiosActions';
import {setCategories} from '../store/actions/categoriesActions';
import {setLanguages} from '../store/actions/languagesActions';
import Colors from '../constants/color-palete';
import {AudiosList} from '../components/AudiosList';

export const HomePage = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const categories = useSelector((state) => state.categories.categories);
  const audios = useSelector((state) => state.audios.audios);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);

    const data: {}[] = [];
    const languages: {}[] = [];
    const categories: {}[] = [];
    const collRef = firestore().collection(`mello/data/audios`);
    const collRef1 = firestore()
      .collection(`mello/data/languages`)
      .orderBy('name', 'asc');
    const collRef2 = firestore()
      .collection(`mello/data/categories`)
      .orderBy('name', 'asc');

    try {
      const snapShot = await collRef.get();
      const snapShot1 = await collRef1.get();
      const snapShot2 = await collRef2.get();
      snapShot.forEach((snap) => {
        if (snap.exists) {
          data.push({
            key: snap.id,
            id: snap.id,
            url: snap.data().audiourl,
            title: snap.data().title,
            artist: snap.data().author.name,
            artwork: snap.data().audiocoverurl,
            duration: snap.data().duration,
            category: snap.data().category,
            status: snap.data().status,
            userAvatar: snap.data().author.avatar,
            language: snap.data().language,
            site: snap.data().site,
            description: snap.data().description,
          });
        } else {
          Alert.alert('Error!!!', 'Document not found');
        }
      });

      snapShot1.forEach((snap) => {
        if (snap.exists) {
          languages.push({
            id: snap.id,
            name: snap.data().name,
            dbname: 'not-assigned',
          });
        } else {
          Alert.alert('Error!!!', 'Document not found');
        }
      });

      snapShot2.forEach((snap) => {
        if (snap.exists) {
          categories.push({
            id: snap.id,
            name: snap.data().name,
            dbname: snap.data().dbname,
          });
        } else {
          Alert.alert('Error!!!', 'Document not found');
        }
      });
    } catch (err) {
      console.error(err);
    }
    dispatch(setAudios(data));
    dispatch(setCategories(categories));
    dispatch(setLanguages(languages));
    setIsRefreshing(false);
  }, [dispatch]);

  // const handleDynamicLink = (link) => {
  //   console.log("Homepage",link)
  // };

  useEffect(() => {
    setShowSpinner(true);
    fetchData().then(function () {
      setShowSpinner(false);
    });

    // const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // return () => unsubscribe();
  }, [fetchData]);

  if (showSpinner) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={Colors.menu} size={50} />
      </View>
    );
  }

  return <AudiosList data={audios} />;
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
