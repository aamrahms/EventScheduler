import { AUTH, LOGOUT } from "../Constants/actionTypes"


const authReducer = (state = { authData: null }, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('userProfile', JSON.stringify({...action?.data}))    
            return { ...state, authData: action?.data }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        
        default:
            return state
    }
}

export default authReducer