import axios from 'axios'

const baseUrl = axios.create({baseURL:"http://localhost:4200"})

//this is where you make all your api calls and export them

baseUrl.interceptors.request.use((req) => {
    if(localStorage.getItem('userProfile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile')).token}`
    }
    return req
})

/**
 * Service call for storing new user information in database
 * @param {*} email 
 * @param {*} familyname 
 * @param {*} givenname 
 * @param {*} username 
 * @param {*} imageurl 
 * @param {*} password 
 * @returns a promise which resolves to a response object or error
 */
export const signup = (email, familyname, givenname, username, imageurl, password) => {
    return baseUrl.post("/api/users/signup", {
        email: email,
        familyName: familyname,
        givenName: givenname,
        userName: username,
        imageUrl: imageurl,
        password: password
    })
};

/**
 * Service call to login existing user
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */

export const login = (username, password) => {
    return baseUrl.post("/api/users/login", {
        userName: username,
        password: password
    })
};


/**
 * Service call for creating new event in the database
 * @param {*} eventName 
 * @param {*} description 
 * @param {*} img 
 * @param {*} date 
 * @param {*} time 
 * @returns a promise which resolves to a response object or error
 */
export const createEvent = (eventName, location, description, img, date, time, endTime, name, chips) => {
    return baseUrl.post("/api/events/createEvent", {
        eventName: eventName,
        location: location,
        description: description,
        img: img,
        date: date,
        time: time,
        endTime: endTime,
        name: name,
        chips: chips
    });

}
//service call for getting all the events in the database
export const getEvents = () => baseUrl.get("/api/events/getEvents")

export const searchEvents = (searchQuery) => baseUrl.get(`/api/events/search?searchQuery=${searchQuery.search || 'none'}`)

export const updateEvent = (id, eventName, location, description, img, date, time, endTime, name, chipsArr) => baseUrl.patch(`/api/events/${id}`, {eventName: eventName, location: location, description: description, img: img, date: date, time: time, endTime: endTime, name: name, chipsArr: chipsArr})

export const likeEvent = (id) => baseUrl.patch(`/api/events/${id}/like`)

export const scheduleEvent = (id) => baseUrl.patch(`/api/events/${id}/schedule`)

export const deleteEvent = (id) => baseUrl.delete(`/api/events/${id}`)
