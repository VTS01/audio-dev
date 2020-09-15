const initialState = {
    languages : []
}

const reducer = (state = initialState,action: { type: any, data:any })=>{
    switch(action.type){
        case "SET_LANGUAGES_DATA" :
            return{
                ...state,
                languages:action.data
            }
        default:
            return state
    }
}

export default reducer