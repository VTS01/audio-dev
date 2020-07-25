import React,{useState} from "react";
import { View, Text, StyleSheet, Image, Button ,TextInput,TouchableWithoutFeedback} from "react-native";
import Colors from '../constants/color-palete'
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { InputComponent } from './InputComponent'
import {CategoryDropDown} from './CategoryDropDown' 
import storage from '@react-native-firebase/storage';
import { DocumentResult } from "expo-document-picker";
import * as firebase from 'firebase'

export const FileInput = (props)=>{
    const [fileURI,setFileURI] = useState("")
    const [fileName,setFileName] = useState("")
    const [category,setCategory] = useState("")
    const [showDropDown,setShowDropDown] = useState(false)
    const [fileSelected,setFileSelected] = useState(false)

    const handleFileNameChange = (fileName : string)=>{
        setFileName(fileName)
    }

    const handleDocumentPicker = async ()=>{
        const result = await DocumentPicker.getDocumentAsync({type:'image/*',copyToCacheDirectory : false})    
        const fileName = result.type === 'cancel'? '' : result.name
        handleFileNameChange(fileName)
        if(result.type==='success')
        {
            setFileURI(result.uri) 
            setFileSelected(true)
        }
    }

    const handleCategoryChange = (categoryName : string)=>{        
        setCategory(categoryName)
        handleDocumentPicker()
        handleShowDropDown()
    }

    const handleShowDropDown = ()=>{
        setShowDropDown(!showDropDown)
    }

    
    const handleSubmit = async()=>{        
        if(fileSelected)
        {
            const file = await fetch(fileURI);
            const blob = await file.blob();
            const ref = firebase.storage().ref(`${category}/${fileName}`)
            const response = await ref.put(blob);
            console.log("****response*******************************************",response);
            setFileSelected(false)
            setFileURI("")
            setFileName("")
        }
        props.setShowModal(false)
    }

    return(
        <View style={styles.screen}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Upload Your Audio</Text>
            </View>
            <View style={styles.uploadButtonContainer}>
                <TouchableWithoutFeedback
                    onPress={handleShowDropDown}
                >
                    <FontAwesome name="upload" size={50} color="black" />
                </TouchableWithoutFeedback>
                <Text style={styles.clickToUploadText}>Click to Upload</Text>
                <InputComponent
                    value={fileName}
                    setValue={handleFileNameChange}
                    type="name"
                    placeholder="Enter File Name"
                />
                <Button 
                    title="Submit"
                    onPress={handleSubmit}
                    color={Colors.primary}
                />
                <TextInput />
            </View>
            {
                showDropDown&&
                    <CategoryDropDown
                        setCategoryName={handleCategoryChange}
                    />
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen :{
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    headerTextContainer :{
        width : '100%',
        height : 35,
        justifyContent : 'flex-start',
        alignItems : 'center',
        padding : 5,
        // borderWidth : 1,
    },
    headerText :{
        fontSize : 16,
    },
    uploadButtonContainer:{
        flex : 1,
        width : '100%',
        // borderWidth : 1,
        justifyContent :'center',
        alignItems : 'center'
    },
    clickToUploadText :{
        marginVertical : 10,
        color : '#ccc',
        fontSize : 20,
    }
})