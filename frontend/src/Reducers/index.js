import { combineReducers } from "redux"

import auth from './auth'
import events from './events'
import { profileReducer, favReducer } from './profile'
import modal from './modal'


export default combineReducers({
    auth, events, profileReducer, favReducer, modal
})