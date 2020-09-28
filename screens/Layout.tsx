import React,{useEffect} from "react"

import {useSelector,useDispatch} from "react-redux"
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore'


import {setUser} from "../store/actions/userActions"
import {LoginstackNavigator,TabNavigator} from "../navigation/navigations"

export const Layout = ()=>{
    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch()

    const onAuthStateChanged = (_user) => {
        if(_user){
          const ref = firestore().doc(`mello/data/user/${_user.uid}`)
          ref.get()
          .then((res1)=>{
            const user = res1.data()
            dispatch(setUser(user))
          })
          .catch((err1)=>{
            const errMessage = err1.message
            Alert.alert(
              'Error!!',
              `${errMessage}`, 
              [{
                text: 'Ok',
                style:'cancel'
              }]
          );
          })    
        }
    };

    useEffect(()=>{
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber();
    },[])

    return(
            user===null?
            <LoginstackNavigator />
            :<TabNavigator/>
    )
}