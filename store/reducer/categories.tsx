const initialState = {
    categories : []
}

const reducer = (state = initialState,action: { type: any, data:any })=>{
    switch(action.type){
        case "SET_CATEGORIES_DATA" :
            return{
                ...state,
                categories:action.data
            }
        default:
            return state
    }
}

export default reducer