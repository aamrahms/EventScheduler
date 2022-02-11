import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import SignUp from './Views/SignUp/SignUp';
import './App.scss';
import CardLayout from './Components/CardLayout/CardLayout.js'
//import EventCreation from './Components/EventCreation/EventCreation';
import Navbar from './Components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faArrowCircleLeft, faSpinner, faHeart, faEdit, faTrash, faPlusCircle, 
    faSignOutAlt, faSearch, faCalendarTimes, faMapMarkerAlt, faCalendar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { getEvents } from './Actions/events';
//for displaying map
//import Map from './Components/Map/DisplayMap'
//import for Footer
import Footer from './Components/Footer/Footer'
//import PopUp from './Components/Navbar/PopUp'
import Modal from './Components/Modal/Modal.js'

library.add(fab, faCoffee, faArrowCircleLeft, faSpinner, faHeart, faEdit, faTrash, faPlusCircle, 
    faSignOutAlt, faSearch, faCalendarTimes, faMapMarkerAlt, faCalendar, faCalendarCheck)

function App() {
    const [isSignup, setIsSignup] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')))
    const dispatch = useDispatch()
    const [showModal, setShowModal]= useState(false);
    //Setting event state with details of event clicked to edit
    const [event, setEvent]=useState();
    //retrieving isAddModal from store
    const isAddModal = useSelector((state) => state.modal)

    //function to toggle popup ;
    //if a card's edit button is clicked, then we will receive event details in eventOfCard
    const openModal=(eventOfCard)=>{
        setShowModal(prevModal=>!prevModal);
        if(eventOfCard)
        {
            setEvent(eventOfCard);
            
        }
    }
    //when isAddModal changes, that is when either edit/add is clicked- render Modal
    useEffect(() => {
    },[isAddModal]);

    
    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])


    return (
        <div>
            {/* if show modal is set, then show Modal component, not otherwise */}
            {showModal? <Modal openModal={openModal} event={event} setShowModal={setShowModal}/>: null}
            
            <Navbar user={user} setUser={setUser} openModal={openModal}  isSignup={isSignup} setIsSignup={setIsSignup} />
            <Routes>
                <Route exact path="/auth" element={<SignUp user={user} />} />
                <Route exact path="/" element={
                    <>
                        <CardLayout openModal={openModal} />
                        {/* <Map /> */}
                        <Footer/>
                    </>
                } />
            </Routes>
        </div>
    )
}

export default App