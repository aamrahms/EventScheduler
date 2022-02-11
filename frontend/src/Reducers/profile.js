import { ISSIGNIN, ISNOTSIGNIN, ISFAV, ISNOTFAV } from "../Constants/actionTypes"


export const profileReducer = (isSignIn = false, action) => {
    switch(action.type){
        case ISSIGNIN:
            return isSignIn = true
        case ISNOTSIGNIN:
            return isSignIn = false    
        default:
            return isSignIn
    }
}

export const favReducer = (isFavPage = false, action) => {
    switch(action.type){
        case ISFAV:
            return isFavPage = true
        case ISNOTFAV:
            return isFavPage = false
        default:
            return isFavPage
    }
}
