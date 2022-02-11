import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, LIKE, DELETE, SCHEDULE } from "../Constants/actionTypes"

const eventsReducer = (events = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload
        case FETCH_BY_SEARCH:
            return action.payload    
        case CREATE:
            return [ ...events, action.payload ]
        case UPDATE:
            return events.map((event) => event._id === action.payload._id ? action.payload : event)
        case LIKE:
            return events.map((event) => (event._id === action.payload._id ? action.payload : event))
        case SCHEDULE:
            return events.map((event) => (event._id === action.payload._id ? action.payload : event))
        case DELETE:
            return events.filter((event) => event.id !== action.payload)
        
        default:
            return events
    }
}


export default eventsReducer