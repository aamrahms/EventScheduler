import React from 'react';
import './EventCard.scss';
import {likeEvent, deleteEvent, scheduleEvent} from '../../Actions/events'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment';

function EventCard(props){
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('userProfile'))
    let gapi = window.gapi
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const API_KEY = process.env.REACT_APP_KUSH_CALENDER_API_KEY
    let DISCOVERY_DOCS =  ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    let SCOPES = "https://www.googleapis.com/auth/calendar"
    // const [isEventLiked, setIsEventLiked] = useState(isLiked(props, user))

    // toggle heart icon
    const Hearts = () => {
        if(props.event.likes.length > 0){
            if(props.event.likes.find((id) => id === user?.profileObj?.googleId || id === user?.profileObj?._id) !== undefined){
                return (<><FontAwesomeIcon className='_liked' icon="heart" /></>)
            } 
            return (<><FontAwesomeIcon icon="heart" /></>)
        } 
        return (<><FontAwesomeIcon icon="heart" /></>)
    }
    
    // handlelike logic
    const handleLike = (e) => {
        e.preventDefault()
        dispatch(likeEvent(props.event.id))
    }

    // handle delete event logic
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteEvent(props.event.id))
    }

    // rsvp when event is scheduled
    const handleRsvpd = (e) => {
        e.preventDefault()
        alert("ALREADY SCHEDULED")
    }

    // handle calender logic
    const handleSchedule = (e) => {
        e.preventDefault()
        dispatch(scheduleEvent(props.event.id))

        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            gapi.client.load('calendar', 'v3', () => console.log("loaded calendar"))

            gapi.auth2.getAuthInstance().signIn()
            .then(() => {
                let event = {
                    'summary': props.event.eventName,
                    'location': props.event.location,
                    'description': props.event.description,
                    'start': {
                      'dateTime': `${props.event.date}T${props.event.time}:00-00:00`,
                      'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                      'dateTime': `${props.event.date}T${props.event.endTime}:50-00:00`,
                      'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    // 'attendees': [
                    //   {'email': 'lpage@example.com'},
                    //   {'email': 'sbrin@example.com'}
                    // ],
                    // 'reminders': {
                    //   'useDefault': false,
                    //   'overrides': [
                    //     {'method': 'email', 'minutes': 24 * 60},
                    //     {'method': 'popup', 'minutes': 10}
                    //   ]
                    // }
                }

                let req = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                })

                req.execute(event => {
                    window.open(event.htmlLink)
                })
            })
        })
        
    }
    return (
        <div className="card">
            <div className="iconContainer _left">
                {user?.profileObj ? <span>
                    {/* RSVPD */}
                    {/* Schedule */}
                    <span className="like-counter">{props.event.scheduled.length}</span>
                    {props.event.scheduled.find((id) => id === user?.profileObj?.googleId || id === user?.profileObj?._id) !== undefined ? 
                    <button className="_editIcon _rsvp" onClick={handleRsvpd}><FontAwesomeIcon icon="calendar-check" /></button> :
                    <button className="_editIcon" onClick={handleSchedule}><FontAwesomeIcon icon="calendar" /><span className="iconText">Add to calendar</span></button> }
                </span> : 
                <span>
                    <span className="like-counter">{props.event.scheduled.length} Attending</span>    
                </span>}
            </div>
            <div className="iconContainer">
                <span>
                    <span className="like-counter">{props.event.likes.length}</span>
                    <button className="_editIcon _like" disabled={!user?.profileObj} onClick={handleLike}><Hearts /></button>
                </span>
                {/* :
                <span>
                        <FontAwesomeIcon className="_liked"icon="heart"/>
                        <span>{props.event.likes.length}</span>
                    </span>
                } */}
                
                {(user?.profileObj?.googleId === props.event.creator || user?.profileObj?._id === props.event.creator) && 
                    <button className="_editIcon" onClick={()=>{
                        dispatch({ type: "ISEDIT"})
                        props.openModal(props.event)
                  }}
                     >
                    <FontAwesomeIcon icon="edit" /></button>}
                {(user?.profileObj?.googleId === props.event.creator || user?.profileObj?._id === props.event.creator) && 
                    <button className="_editIcon _trash" onClick={handleDelete}><FontAwesomeIcon icon="trash" /></button>}
            </div>
            <div className="overlay"></div>
            <img className="eventImg" src={props.event.img} alt="event-pic"/>
            {/* {flagIcon} */}
            <div className="cardContent">
                <div className="infomation">
                    <div className="data_info">
                        <FontAwesomeIcon icon="calendar-times" />&nbsp;
                        <Moment format="MMM DD, YYYY">
                            {props.event.date}
                        </Moment>
                    </div>
                    <hr className="divider_vertical"></hr>
                    <div className="location_info">
                        <FontAwesomeIcon icon="map-marker-alt" />&nbsp;
                        {props.event.location}
                    </div>
                </div>

                <div className="eventTitle">
                    {props.event.eventName}
                    <span> by </span>
                    {props.event.name}
                </div>

                <div className="eventDesc">{props.event.description}</div>
            </div>
        </div>
    )
}

export default EventCard