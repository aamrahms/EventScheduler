import Event from "../models/CardLayout/Event.js";
/**
 * 
 * @param {*} params 
 * @returns {}
 */
//
export const searchEvent =(params={})=>{
    //const id=params.id || 1
    const promise=Event.find(params).exec();
    return promise;
};

// searches event by query i.e title in this case
export const searchEventsByQuery = (eventName) => {
    return Event.find({ $or:[{eventName: eventName}, {chips: { $in:eventName}}] }).exec();
}

//takes event, and saves it to the events collection
export const createEvent=async (event)=>{
    try { 
        const newContact=new Event(event);
        return newContact.save();//should return a promise, this is of mongoose   
    } catch (error) {
        console.log(error)
    }
}
//gets event on the basis of id, searches in the events collection and returns the event
export const getEvent=(id)=>{
    const promise=Event.findById(id).exec();
    return promise;
}
//takes event and updates it in the events collection
export const updateEvent = async (id, event) => {
    try {
        const promise = await Event.findByIdAndUpdate(id, event, {new: true}).exec();
        return promise
    }catch (err){
        console.log(err)
    }
}
//takes id of the event and deletes it in the events collection
export const deleteEvent = async (id) => {
    const promise = await Event.findByIdAndRemove(id).exec()
    return promise
}
