import * as api from '../Api/index'

export const getEvents = () => async (dispatch) => {
    try {
       const {data} = await api.getEvents()
       dispatch({ type: 'FETCH_ALL', payload: data })
       
    } catch (error) {
       console.log(error.message) 
    }
}

export const getEventsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.searchEvents(searchQuery)
        dispatch({ type: 'FETCH_BY_SEARCH', payload: data })
    } catch(e) {
        console.log(e.message)
    }
}

export const createEvent = (eventName, location, description, img, date, time, endTime, name, chips) => async (dispatch) => {
    try {
        const {data} = await api.createEvent(eventName, location, description, img, date, time, endTime, name, chips)
        dispatch({ type: 'CREATE', payload: data })

    } catch (error) {
       console.log(error.message) 
    }
}

export const likeEvent = (id) => async (dispatch) => {
    try {
        const {data} = await api.likeEvent(id)
        dispatch({ type: 'LIKE', payload: data })
    } catch (error) {
       console.log(error.message) 
    }
}

export const scheduleEvent = (id) => async (dispatch) => {
    try {
        const {data} = await api.scheduleEvent(id)
        dispatch({ type: 'SCHEDULE', payload: data })
    } catch (error) {
       console.log(error.message) 
    }
}

export const deleteEvent = (id) => async (dispatch) => {
    try{
        await api.deleteEvent(id)
        dispatch({ type: 'DELETE', payload: id })
    } catch (e) {
        console.log(e)
    }
}

export const updateEvent = (id, eventName, location, description, img, date, time, endTime, name, chipsArr) => async (dispatch) => {
    try {
        const { data } = await api.updateEvent(id, eventName, location, description, img, date, time, endTime, name, chipsArr)
        dispatch({ type: 'UPDATE', payload: data })
    } catch (e) {
        console.log(e.message)
    }
}
