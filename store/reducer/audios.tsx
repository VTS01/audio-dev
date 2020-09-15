const initialState  = {
    audios : []
}

const reducer = (state = initialState , action: { type: any; data: any; })=>{
    switch(action.type){
        case "SET_DATA":{
            return {
                ...state,
                audios : action.data
            }
                
        }
        default:
            return state;

    }

}

export default reducer