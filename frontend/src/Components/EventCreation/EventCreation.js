
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
//import ReactDOM from 'react-dom';
import Form from "react-validation/build/form";
import FileBase from 'react-file-base64';
import {createEvent, updateEvent} from '../../Actions/events';
import { useDispatch } from 'react-redux';
import './EventCreation.scss';
import Input from "react-validation/build/input"
import CheckFieldsButton from "react-validation/build/button"
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const EventCreation=({event, setShowModal})=>{
    /**
     * states describing the event and marking changes in the event.
     * 
     */

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [showImg, setShowImg] = useState(false)
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [endTime, setEndTime] = useState("")
    const [location, setLocation] = useState("")
    const isAddModal = useSelector((state) => state.modal)
    const [chips, setChips] = useState("")
    const [eventData, setEventData]=useState({event});
    const dispatch = useDispatch()
    //for modal
    const user = JSON.parse(localStorage.getItem('userProfile'))
    const handleUpdate = () => {
        dispatch(updateEvent(event.id))
    }
    
    
    //in case of edit, event prop exists, set states with events fields
    useEffect(() => {
        if(event)
        {
            setStateIfEvent()
        }
        return () => {
            setEventData({}); // This worked for me
          };
    },[event]);
 
    const setStateIfEvent = async () => {
        const chipsSpaced=event.chips.join(' ');
        setEventName(event.eventName);
        setDescription(event.description);
        setImg(event.img);
        setDate(event.date);
        setTime(event.time);
        setLocation(event.location);
        setEndTime(event.endTime);
        setChips(chipsSpaced);
        setEventData(event);
    } 
    /**
     * Variables for validation on form
     */
    const [errorMsg, setErrorMsg] = useState("")
    const formElement = React.useRef()
    const chkbuttonElement = React.useRef();
    const uploadBtnElement = React.useRef(null);

    /**
       * Validation for creation of event form
       * @param {*} value value to check if empty
       * @returns error message if feild is empty
       */
    const required = (value) => {
        if (!value) {
            return (
                <p className='text-red-500 text-sm italic mt-2'><sup>*</sup> This field is required!
                </p>
            )
        }
    }
/**
 * Validating date 
 * @param {*} value 
 */

    const validateDate = (value) => {
        const currentDate = new Date();
        if (currentDate => value) {
            <p className='text-red-500 text-sm italic mt-2'><sup>*</sup> Cannot select past date!
            </p>
        }

    }

    /**
     * Handle logic to throw error on image upload
     */
    const handleImageContent = (e) => {
        setErrorMsg("")
        let file = e.target.files[0]
        let files = []
        let reader = new FileReader()

        if (file !== undefined) {
            reader.readAsDataURL(file)
            reader.onload = () => {
                let fileData = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                };
                files.push(fileData)
                if (!(Math.round(file.size / 1000) > 15000)) {
                    if (fileData.base64) {
                        setImg(fileData.base64)
                        setShowImg(true)
                    } else {
                        setShowImg(false)
                    }
                } else {
                    setErrorMsg("File size cannot be more than 16 MB. File won't be uploaded")
                    uploadBtnElement.current.value = ""
                    setImg("")
                    setShowImg(false)
                }

                if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
                    setImg("")
                    setShowImg(false)
                    uploadBtnElement.current.value = ""
                    setErrorMsg("Please select only jpg, jpeg or png file formats")
                }
            }
        } else {
            setImg("")
            setShowImg(false)
        }
    }



    //in case of edit, event prop exists, set states with events fields
    useEffect(() => {
        if (event) {
            setEventName(event.eventName);
            setDescription(event.description);
            setImg(event.img);
            setDate(event.date);
            setTime(event.time);
            setLocation(event.location);
        }
    }, [event]);


    //clear all states
    const clearAllFields = async () => {
        setErrorMsg("")
        await setEventName("");
        await setDescription("");
        await setImg("");
        await setDate("");
        await setTime("");
        await setLocation("")
        await setEndTime("")
        await setChips("")
    }


    //whenever form is submitted
    const submitForm = async (e) => {
        e.preventDefault();
        
        
        let chipsArr = chips.split(" ")
        //dispatch call for edit event
        if(!isAddModal)
        {
            setEventData(eventData => ({
                ...eventData,
                name : user?.profileObj?.name,
                eventName : eventName,
                location : location,
                description : description,
                img : img,
                date : date,
                time : time,
                endTime : endTime,
                chips : chipsArr 
                
            }))
            dispatch(updateEvent(eventData.id, eventName, location, description, img, date, time, endTime, user?.profileObj?.name, chipsArr))
             clearAllFields();
            setShowModal((previousState=>!previousState));
        }
        else{
            //dispatch call for create event
            formElement.current.validateAll()
            // checkIfNull;
            if (chkbuttonElement.current.context._errors.length === 0) {
                if (!user?.profileObj?.name) {
                    clearAllFields();
                    setShowModal((previousState) => !previousState) 
                }
            //dispatch call for create event
            dispatch(createEvent(eventName, location, description, img, date, time, endTime, user?.profileObj?.name, chipsArr))
            clearAllFields();
            setShowModal((previousState=>!previousState));
            }
        }
         
        
        //handleUpdate();
        
    }
    //whenever fields are updated
    const change = (oneElement) => {
        let value = oneElement.target.value;
        setErrorMsg("")
        switch (oneElement.target.dataset.state) {
            case 'setEventName':
                setEventName(value);
                break;
            case 'setLocation':
                setLocation(value);
                break;
            case 'setDescription':
                setDescription(value);
                break;
            case 'setDate':
                setDate(value);
                break;
            case 'setTime':
                setTime(value);
                break;
            case 'setEndTime':
                setEndTime(value)
                break
            case 'setChips':
                setChips(value)
                break
            default:
                return null
        }
    }
/**
 * Conditionally rendering based on edit or update 
 */
    return (
        <div className='container bg-white h-3/4'>
            {errorMsg ? <>
                <div className="error_message" role="alert">
                    {errorMsg}
                </div>
            </> : null
            }
            <Form onSubmit={(event) => submitForm(event)} ref={formElement} className="form">
                <div className='content_wrapper px-5 py-10'>
                    {/* depending on which button is clicked(add/edit) change heading */}
                    {isAddModal ? <h1 className="tagline"> Create an Event</h1> : <h1 className="tagline"> Edit  {eventName}</h1>}

                    <fieldset className="column_fieldset">
                        <label> Event Name</label>
                        <Input
                            id="eventName"
                            type="text"
                            name="eventName"
                            value={eventName}
                            className="_inputField"
                            data-state='setEventName'
                            onChange={change}
                            validations={[required]}
                        />
                    </fieldset>
                    <fieldset className="column_fieldset">
                        <label> Location</label>
                        <Input
                            id="location"
                            type="text"
                            name="location"
                            className="_inputField"
                            value={location}
                            data-state='setLocation'
                            onChange={change}
                            validations={[required]} />
                    </fieldset>
                    <fieldset className="column_fieldset">
                        <label> Description</label>
                        <Input
                            id="description"
                            type="textarea"
                            name="description"
                            className='_inputField'
                            value={description}
                            data-state='setDescription'
                            onChange={change}
                            validations={[required]}
                            placeholder="What's the event about?" />
                    </fieldset>
                    <div className='flex'>
                        <fieldset className="column_fieldset col-span-1">
                            <label> Date </label>
                            <Input
                                id='date'
                                type="date"
                                name='date'
                                className='_inputField'             value={date}
                                data-state='setDate'
                                validations={[required, validateDate]}
                                onChange={change}
                            />
                        </fieldset>
                        <fieldset className="column_fieldset col-span-2">
                            <label> Time</label>
                            <Input
                                id='time'
                                type="time"
                                name='time'
                                className='_inputField'
                                value={time}
                                data-state='setTime'
                                validations={[required]}
                                onChange={change} />
                        </fieldset>
                        <fieldset className="column_fieldset">
                        <label>End Time</label>
                        <Input
                            id='endTime'
                            type="time"
                            name="endTime"
                            className='_inputField'
                            value={endTime}
                            data-state='setEndTime'
                            validations={[required]}
                            onChange={change} />
                    </fieldset >
                    </div>
                    <fieldset className="column_fieldset">
                        <label>Tags (Space separated)</label>
                        <Input
                            id='chips'
                            type="text"
                            name="chips"
                            className='_inputField'
                            value={chips}
                            data-state='setChips'
                            validations={[required]}
                            onChange={change} />
                    </fieldset>
                   

                    <fieldset className="column_fieldset right">
                        <label> Image </label>
                        {/* <Input type="file"  accept="image/*" name="image" id="file" /> */}
                        <input
                            id='Img'
                            name='Img'
                            type="file"
                            ref={uploadBtnElement}
                            validations={[required]}
                            onChange={handleImageContent}
                            onClick={() => setErrorMsg("")}
                        />
                        {/* <FileBase type="file" multiple={false} onDone={(base64) => onFileUpload(base64)} 
                        onClick={() => setErrorMsg("")} /> */}
                    </fieldset>
                    {showImg ?
                        <fieldset className="column_fieldset">
                            <img alt="profile" src={img} className="Img"></img>
                        </fieldset>
                        : null
                    }
                    {/* <button onSubmit={(event) => submitForm(event)} className="save" type="submit">Add</button> */}
                    <button className="save" type="submit">{isAddModal ? "Create" : "Update"}</button>
                </div >
                <CheckFieldsButton style={{ display: "none" }} ref={chkbuttonElement} />
                {/* <button className="closeAdd" onClick={()=>closeAdd}>{close}</button> */}
            </Form >

        </div >
    )
}

 
export default EventCreation;

