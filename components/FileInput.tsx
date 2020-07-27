import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';

import storage from '@react-native-firebase/storage';

import {CategoryList} from '../Data/CategoriesList';
import {AvailableLanguageList} from '../Data/AvailableLanguageList';
import Colors from '../constants/color-palete';
import {DropDown} from './DropDown';

export const FileInput = (props) => {
  const [fileURI, setFileURI] = useState('');
  const [fileName, setFileName] = useState('File');
  const [category, setCategory] = useState('Category');
  const [language, setLanguage] = useState('Language');
  const [canSubmit, setCanSubmit] = useState(false);
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);
  const [showLanguageDropDown, setShowLanguageDropDown] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileNameChange = (_fileName: string) => {
    setFileName(_fileName);
  };

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      const _fileName = result.type === 'cancel' ? 'File' : result.name;
      handleFileNameChange(_fileName);
      if (result.type === 'success') {
        setFileURI(result.uri);
      }
      setCanSubmit(
        fileName !== 'File' &&
          category !== 'Category' &&
          language !== 'Language',
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    setCategory(categoryName);
    setCanSubmit(
      fileName !== 'File' && category !== 'Category' && language !== 'Language',
    );
    handleShowCategoryDropDown();
  };

  const handleShowCategoryDropDown = () => {
    setShowCategoryDropDown(!showCategoryDropDown);
  };

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    handleShowLanguageDropDown();
    setCanSubmit(
      fileName !== 'File' && category !== 'Category' && language !== 'Language',
    );
  };

  const handleShowLanguageDropDown = () => {
    setShowLanguageDropDown(!showLanguageDropDown);
  };

  const handleSubmit = async () => {
    const file = await fetch(fileURI);
    const blob = await file.blob();
    const ref = storage().ref(`audio/${language}/${category}/${fileName}`);
    const uploadTask = ref.put(blob);
    uploadTask.on('state_changed', (snapshot) => {
      const _progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(_progress);
      setProgress(_progress);
    });
    setCanSubmit(false);
    setFileURI('');
    setFileName('File');
  };

  const handleCancel = () => {
    setFileName('File');
    setCategory('Category');
    setLanguage('Language');
    setCanSubmit(false);
    props.setShowModal(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Upload Your Audio</Text>
      </View>
      <View style={styles.formContainer}>
        <TouchableNativeFeedback onPress={handleShowCategoryDropDown}>
          <View style={styles.inputField}>
            <Text
              style={
                category === 'Category'
                  ? styles.inputFieldText
                  : styles.inputFieldActive
              }>
              {category}
            </Text>
            <Text style={styles.asterisk}>
              {category === 'Category' ? '*' : ''}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleShowLanguageDropDown}>
          <View style={styles.inputField}>
            <Text
              style={
                language === 'Language'
                  ? styles.inputFieldText
                  : styles.inputFieldActive
              }>
              {language}
            </Text>
            <Text style={styles.asterisk}>
              {language === 'Language' ? '*' : ''}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleDocumentPicker}>
          <View style={styles.inputField}>
            <Text
              style={
                fileName === 'File'
                  ? styles.inputFieldText
                  : styles.inputFieldActive
              }>
              {fileName}
            </Text>
            <Text style={styles.asterisk}>
              {fileName === 'File' ? '*' : ''}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.buttonContainer}>
          <Button
            title="Upload"
            onPress={handleSubmit}
            color={Colors.primary}
            disabled={!canSubmit}
          />
          <Button title="cancel" onPress={handleCancel} color={Colors.danger} />
        </View>
      </View>
      {showCategoryDropDown && (
        <DropDown
          label="Category"
          data={CategoryList}
          setSelectedItem={handleCategoryChange}
        />
      )}
      {showLanguageDropDown && (
        <DropDown
          label="Language"
          data={AvailableLanguageList}
          setSelectedItem={handleLanguageChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    width: '100%',
    height: 35,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    // borderWidth : 1,
  },
  headerText: {
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    // borderWidth : 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  clickToUploadText: {
    marginVertical: 10,
    color: '#ccc',
    fontSize: 20,
  },
  inputField: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputFieldText: {
    fontSize: 15,
    color: '#ccc',
  },
  inputFieldActive: {
    fontSize: 15,
    color: 'black',
  },
  asterisk: {
    color: Colors.danger,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});
