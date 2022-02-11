import { ISADD, ISEDIT } from "../Constants/actionTypes"

//used by the popUp to check if it was called by the add event button or edit event button 
const modalReducer = (isAddModal = false, action) => {
    switch(action.type){
        //in case add button was clicked, set isAddModal to true
        case ISADD:
            return isAddModal = true
        //in case edit button was clicked, set isAddModal to false
        case ISEDIT:
            return isAddModal = false    
        default:
            return isAddModal
    }
}

export default modalReducer