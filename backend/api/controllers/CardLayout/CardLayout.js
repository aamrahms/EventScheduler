//map all the named exports to the below object
import { response } from "express";
import Event from "../../models/CardLayout/Event.js";
import mongoose from "mongoose";
import * as CardLayoutService from "../../services/CardLayout.js";


//Method to handle errors
const errorHandler = (message,response, errCode=500)=>{
    response.status(errCode);
    response.json({error:message});
};

//method to execute when exec is successfull
const setSuccessResponse= (data, response)=>{
    response.status(200);
    response.json(data);

};
// calls service to getAllEvents
export const getAllEvents=async (request,response)=>{
    //response will get all the event deets
    try{
        const events= await CardLayoutService.searchEvent();
        setSuccessResponse(events, response);
    }catch(e){
        errorHandler(e.message,response);
    }
    

}

// get events by search
export const getEventsBySearch = async (req, resp) => {
    try {
        // i is ignore case
        const { searchQuery, chips }  = req.query
        const eventName = new RegExp(searchQuery, 'i')
        const events = await CardLayoutService.searchEventsByQuery(eventName)
        resp.json(events)
    } catch (e) {
        resp.status(404).json({message: e.message})
    }
}

//Method used to save data when POST is executed
export const saveEvent= async (request,response)=>{
    try{
        //shallow clone = ... = clones
        const event={...request.body, creator: request.userId, creationDate: new Date().toISOString()};
        const newEvent= await CardLayoutService.createEvent(event);
        setSuccessResponse(newEvent,response);
    }
    catch(e)
    {
        errorHandler(e.message,response);
    }

};


// calls service to get an Event by its id
export const getEvent=async (request,response)=>{
    try{
        //in route called it as id, sets the params.id with whatever the url had as id
        const id=request.params.id;
        const event= await CardLayoutService.getEvent(id);
        setSuccessResponse(event, response);
    }catch(e){
        errorHandler(e.message,response);
    }
};

// calls service to add user who liked the Event, in the likes array
export const likeEvent = async (req, resp) => {
    try {

        const { id } = req.params
        
        if(!req.userId) return errorHandler("Unauthenticated", resp)

        const event = await CardLayoutService.getEvent(id)
        const didLike = event.likes.findIndex((id) => id === String(req.userId))

        if(didLike === -1){
            //Liking the post
            event.likes.push(req.userId)
        }else{
            event.likes = event.likes.filter((id) => id !== String(req.userId))
        }

        const newEvent = await CardLayoutService.updateEvent(id, event)
        setSuccessResponse(newEvent, resp)

    } catch (error) {
       errorHandler(error.message, resp)
    }
}
// calls service to schedule an event, sends user id and updates it in event collection 
export const scheduleEvent = async (req, resp) => {
    try {
        const { id } = req.params

        if(!req.userId) return errorHandler("Unauthenticated", resp)

        const event = await CardLayoutService.getEvent(id)
        event.scheduled.push(req.userId)

        const newEvent = await CardLayoutService.updateEvent(id, event)
        setSuccessResponse(newEvent, resp)
    } catch (error) {
       errorHandler(error.message, resp) 
    }
}
// calls service to delete the event by its ID 
export const deleteEvent = async (req, resp) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return errorHandler(`No post with id ${id}`, resp, 404) 

        const event = await CardLayoutService.deleteEvent(id)
        setSuccessResponse({message: `Deleted post with id ${id}`}, resp)

    } catch (error) {
       errorHandler(error.message, resp) 
    }
}
// calls service to update the entire event, with event received in body of request
export const updateEvent=async (request,response)=>{
    try{
        //in route called it as id, sets the params.id with whatever the url had as idd
        const {id}=request.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return response.errorHandler(`No post with id ${id}`, response, 404);
        const event = {...request.body, creator: request.userId, chips: request.body.chipsArr}
        const updatedEvent= await CardLayoutService.updateEvent(id, event);
        setSuccessResponse(updatedEvent, response);
    }catch(e){
        errorHandler(e.message,response);
    }
}
