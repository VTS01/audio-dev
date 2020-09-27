export const setUser = (data)=>{
    return{
        type:"SET_USER",
        data
    }
}

export const removeUser = ()=>{
    return{
        type:"REMOVE_USER"
    }
}