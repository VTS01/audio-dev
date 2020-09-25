import React from "react"

import {View,Text,StyleSheet,Image,TouchableOpacity,Linking} from "react-native"
import {useSelector,useDispatch} from "react-redux"
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth';

import Colors from "../constants/color-palete"
import {removeUser} from "../store/actions/userActions"

export const ProfilePage = ()=>{
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const handleFeedBackButtonClick = ()=>{
        Linking.openURL('mailto:info@yourmello.com?subject=Feedback Mail')
    }

    const handleReferToFriendButtonClick = ()=>{

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

    return(
        <View style={styles.container}>
            <View style={styles.userDetailsContainer}>
                <View style={styles.userAvatarContainer}>
                    <Image 
                        style={styles.userAvatar}
                        source={user.photoURL===null?require('../assets/profile-icon.jpg'):{uri:user.photoURL}}
                    />
                </View>
                <Text style={styles.userName}>{user.displayName}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleReferToFriendButtonClick}
                >
                    <View style={styles.referButton}>
                        <Text style={styles.buttonText}>
                            Refer Mello to a friend
                        </Text>
                        <Fontisto name="persons" size={24} color={Colors.secondary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={handleFeedBackButtonClick}
                >
                    <View style={styles.feedbackButton}>
                        <Text style={styles.buttonText}>
                            Your Feedback
                        </Text>
                        <AntDesign name="message1" size={24} color={Colors.secondary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleLogoutButtonClick}
                    >
                        <View style={styles.logoutButton}>
                            <Text style={styles.logOutText}>
                                Log out
                            </Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'space-between',
        paddingVertical:5,
        alignItems:'center'
    },
    userDetailsContainer:{
        width:'100%',
        height:'40%',
        alignItems:'center',
        justifyContent:'space-around'
    },
    userAvatarContainer:{
        width:150,
        height:150,
        borderRadius:75,
        overflow:'hidden'
    },
    userAvatar:{
       width:'100%',
       height:'100%' 
    },
    userName:{
        fontSize:20,
        fontWeight:'bold'
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
        marginTop:15,
        backgroundColor:'white',
        elevation:4
    },
    buttonText:{
        fontSize:15,
        color:Colors.secondary,
        marginRight:10,
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
    }
})