import React from "react";
import { View, Text, StyleSheet, Image, Button ,TextInput} from "react-native";
import Colors from '../constants/color-palete'
import * as DocumentPicker from 'expo-document-picker';

export const DashboardScreen = () => {
  return (
    <View style={styles.screen}>
      <Image source={require('../assets/logo.jpg')} style={styles.albumImage}/>
      <Text>Publish on Mello</Text>
      <Text>Upload your first audio</Text>
      <Button 
        title="Start Uploading"
        onPress={()=>DocumentPicker.getDocumentAsync({type:'image/*'})}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  albumImage:{
    width: 300,
    height: 200,
    backgroundColor: Colors.logobackground,
    borderWidth: 1,
    marginVertical: 30,
    // borderRadius: 50,
  }
});
