import React, {useState} from 'react';
import EventCreation  from '../../EventCreation/EventCreation';
import styled from 'styled-components'
import { MdClose } from 'react-icons/md';
import './PopUp.scss';

export default function PopUp(){
    const [showModal, setShowModal]= useState(false);

    const openModal=()=>{
        setShowModal(prevModal=>!prevModal);
    }
    

    return (
        <>
        {/* <div> */}
            {/* <ModelWrapper showModal={showModal}> */}
            <button onClick={openModal}>Add</button>
            {/* <div className="Background">
                <div className="ModalWrapper"> */}
                    <EventCreation showModal={showModal} setShowModal={setShowModal}></EventCreation>
                    {/* <div className="CloseModalButton" onClick={()=>setShowModal(prev=>!prev)}></div> */}
                {/* </div>
            </div> */}
        {/* </div> */}
        </>
    );
}