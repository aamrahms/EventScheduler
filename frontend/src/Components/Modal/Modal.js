import React from 'react';
import { useSelector } from 'react-redux';
import EventCreation from '../EventCreation/EventCreation';
import './Modal.scss'
/**
 * Displays a popup modal dialog for create and edit. Conditional rendering based on request
 * @param {*}  
 * @returns 
 */
export default function Modal({ openModal, event, setShowModal }) {
    const isAddModal = useSelector((state) => state.modal)
    return (

        <div className="modal_fade">
            <div className='popup'>
                <div className="modal-body" >
                    {
                        isAddModal ? <EventCreation setShowModal={setShowModal}></EventCreation> :
                            <EventCreation setShowModal={setShowModal} event={event}></EventCreation>
                    }
                </div>
                {/*  */}
                <div className="modal-close" >
                    <a class="close" onClick={() => setShowModal(prev => !prev)} href="#popup1">×</a>

                </div>
            </div>
        </div>

    );
}