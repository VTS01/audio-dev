import React from "react"

import {useSelector} from "react-redux"

import {LoginstackNavigator,TabNavigator} from "../navigation/navigations"

export const Layout = ()=>{
    const user = useSelector(state=>state.user.user)

    return(
            user===null?
            <LoginstackNavigator />
            :<TabNavigator/>
    )
}