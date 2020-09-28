import React, { useState } from "react"

import {View,Text,StyleSheet,Image,TouchableNativeFeedback,TouchableWithoutFeedback,Linking, Alert,Share} from "react-native"
import {useSelector,useDispatch} from "react-redux"
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

import Colors from "../constants/color-palete"
import {removeUser} from "../store/actions/userActions"
import {DropDown} from "../components/DropDown"
import {Loader} from "../components/Loader"

export const ProfilePage = ()=>{
    const user = useSelector(state => state.user.user)
    const categories =  useSelector(state => state.categories.categories)
    const [selectedInterest,setSelectedInterest] = useState('Select')
    const [showDropDown,setShowDropDown] = useState(false)
    const [showLoader,setShowLoader] = useState(false)
    const dispatch = useDispatch()

    const handleFeedBackButtonClick = ()=>{
        Linking.openURL('mailto:info@yourmello.com?subject=Feedback Mail')
    }

    const handleReferToFriendButtonClick = async ()=>{
        setShowLoader(true)
        try{
            const result = await Share.share({
                message: 'Put App Link Here',//App link from play store
            });

            setShowLoader(false)

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                 console.log(result.activityType);
                }else {
                  console.log('shared');
                }
            }else if (result.action === Share.dismissedAction) {
            console.log('not shared');
          }
        }catch (err) {
            setShowLoader(false)
          console.log(err);
        }
    }

    const handleLogoutButtonClick = ()=>{
        auth()
        .signOut()
        .then(()=>{
            dispatch(removeUser())
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleShowDropDown = ()=>{
        setShowDropDown(true)
    }

    const handleCloseDropDown = ()=>{
        setShowDropDown(false)
    }

    const handleInterestSelection = (val:string)=>{
        setSelectedInterest(val)
        handleCloseDropDown()
    }

    const handleSubmitUserInterest  = async ()=>{
        setShowLoader(true)
        try{
            const ref = firestore().doc(`mello/data/user/${user.uid}`)
            await ref.update({
              interest : selectedInterest  
            })
            setShowLoader(false)
            Alert.alert(
                'Confirmation Message:',
                'Your interested is successfully recorded.',
                [{
                    text:'Ok',
                    style:'cancel'
                }]
            )
        }catch(err){
            setShowLoader(false)
            const errMessage = err.message
            Alert.alert(
                'Error!!!',
                `${errMessage}`,
                [{
                    text:'Ok',
                    style:'cancel'
                }]
            )
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.userDetailsContainer}>
                <View style={styles.userAvatarContainer}>
                    <Image 
                        style={styles.userAvatar}
                        source={user.photoURL===null?require('../assets/profile-icon.jpg'):{uri:user.photoURL}}
                    />
                </View>
                <View style={styles.nameAndMailContainer}>
                    <Text style={styles.userName}>{user.displayName}</Text>
                    <Text style={styles.userMail}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.interestSelectorContainer}>
                <Text style={styles.selectYourInterestTitle}>Select Your Interest:</Text>
                <TouchableWithoutFeedback
                    onPress={handleShowDropDown}
                >
                    <View style={styles.dropDownTextHolder}>
                        <Text style={styles.dropDownText}>
                            {selectedInterest}
                        </Text>
                        <AntDesign name="caretdown" size={20} color="black" />
                    </View>
                </TouchableWithoutFeedback>
                {
                    selectedInterest!=='Select'?
                    <View style={styles.submitButtonContainer}>
                        <TouchableNativeFeedback
                            onPress={handleSubmitUserInterest}
                        >
                            <View style={styles.submitButton}>
                                <Text style={styles.submitText}>
                                    Submit
                                </Text>
                            </View> 
                        </TouchableNativeFeedback>
                    </View>
                    :null 
                }
            </View>
            {
                   showDropDown&&
                   <DropDown
                        data={categories}
                        setSelectedItem={handleInterestSelection}
                        label='Your Interest.'
                        closeDropDown={handleCloseDropDown}
                   />
            }
            <View style={styles.buttonContainer}>
                <View style={{overflow:'hidden',borderRadius:25}}>
                    <TouchableNativeFeedback
                        onPress={handleReferToFriendButtonClick}
                    >
                        <View style={styles.referButton}>
                            <Text style={styles.buttonText}>
                                Refer Mello to a friend
                            </Text>
                            <Fontisto name="persons" size={24} color={Colors.secondary} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{overflow:'hidden',borderRadius:25,marginTop:10}}>
                    <TouchableNativeFeedback
                        onPress={handleFeedBackButtonClick}
                    >
                        <View style={styles.feedbackButton}>
                            <Text style={styles.buttonText}>
                                Your Feedback
                            </Text>
                            <AntDesign name="message1" size={24} color={Colors.secondary} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.logoutButtonContainer}>
                    <TouchableNativeFeedback
                        onPress={handleLogoutButtonClick}
                    >
                        <View style={styles.logoutButton}>
                            <Text style={styles.logOutText}>
                                Log out
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            {
                showLoader&&
                <Loader/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'space-between',
        // paddingVertical:5,
        alignItems:'center'
    },
    userDetailsContainer:{
        width:'100%',
        height:'35%',
        alignItems:'center',
        justifyContent:'space-around',
    },
    userAvatarContainer:{
        width:100,
        height:100,
        borderRadius:50,
        overflow:'hidden'
    },
    userAvatar:{
       width:'100%',
       height:'100%' 
    },
    userName:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    userMail:{
        fontSize:15,
        color:Colors.menu
    },
    buttonContainer:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        paddingHorizontal:40,
    },
    referButton:{
        width:'100%',
        borderWidth:2,
        borderRadius:25,
        borderColor:Colors.secondary,
        flexDirection:'row',
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        paddingVertical:8,
        backgroundColor:'white',
        elevation:4
    },
    feedbackButton:{
        width:'100%',
        borderWidth:2,
        borderRadius:25,
        borderColor:Colors.secondary,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:8,
        // marginTop:15,
        backgroundColor:'white',
        elevation:4
    },
    buttonText:{
        fontSize:15,
        color:Colors.secondary,
        marginRight:10,
    },
    logoutButtonContainer:{
        width:'100%',
        alignItems:'center',
        marginBottom:5,
    },
    logoutButton:{
        width:'30%',
        marginTop:15,
        paddingVertical:8,
        paddingHorizontal:15,
        backgroundColor:'#ccc',
        alignItems:'center',
    },
    logOutText:{
        fontSize:15,
    },
    selectYourInterestTitle:{
        fontSize:20,
        fontWeight:'bold',
    },
    dropDownTextHolder:{
        marginVertical:5,
        borderWidth:2,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:3,
        paddingHorizontal : 5,
    },
    dropDownText:{
        fontSize:16,
    },
    submitButtonContainer:{
        marginVertical:10,
        alignItems:'center'
    },
    submitButton:{
        borderWidth:2,
        paddingHorizontal:8,
        paddingVertical:4,
        backgroundColor:Colors.secondary,
        borderColor:Colors.secondary,
        elevation:8
    },
    submitText:{
        color:'white',
        fontSize:15,
    }
})