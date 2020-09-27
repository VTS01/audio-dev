import React,{useEffect} from "react"

import {useSelector,useDispatch} from "react-redux"
import auth from '@react-native-firebase/auth';
import {setUser} from "../store/actions/userActions"

import {LoginstackNavigator,TabNavigator} from "../navigation/navigations"
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const Layout = ()=>{
    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch()

      
    const handleDynamicLink = (link) => {
      console.log("Layout2",link)
    };

    const onAuthStateChanged = (_user) => {
        if(_user){
          const loggedUser = {
            displayName:_user.displayName,
            photoURL : _user.photoURL,
            uid : _user.uid,
            email:_user.email,
            role:"listener"
          }
          dispatch(setUser(loggedUser))      
        }
    };

    useEffect(()=>{
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

        dynamicLinks()
          .getInitialLink()
          .then(link => {
            console.log("Layout1",link);
        });

        return () =>{
          subscriber;
          unsubscribe();
        } 
    },[])

    return(
            user===null?
            <LoginstackNavigator />
            :<TabNavigator/>
    )
}