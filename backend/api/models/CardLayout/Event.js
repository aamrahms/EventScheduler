import Mongoose from "mongoose";

//
/**
 * defines the structure of events in database
 * each event has a 
 * eventName, image, location, description
 * start and end time, date of event,  date of creation
 * chips/tags attached to it
 * person who created it
 * people who liked the event
 * people who scheduled it
 */
const EventSchema=new Mongoose.Schema({
    "eventName" :{
        type :String,
        required : "Event name is needed to create it"
    },
    "img" : {
        type : String,
        //defined required : on error it will say the following
        // required : "Add an image, it will look prettier"
    },
    "location": {
        type: String,
        required : "Please add your event location"
    },
    "name": {
        type: String
    },
    "description" : {
        type : String,
        //defined required : on error it will say the following
        required : "Please add a description"
    },
    "time" :{
        type : String,
        required : "Time is a required field"
    },
    "endTime": {
        type : String,
        required : "End Time is a required field" 
    },
    "chips": {
        type: [String],
        default: []
    },
    "creationDate" : {
        type : Date,
        default : new Date()
    },
    "scheduled":{
        type: [String],
        default:[]
    },
    "likes" : {
        type : [String],
        default : []
    },
    "creator" : {
        type : String,
        required : "User is not logged in"
    },
    "date" : {
        type : String,
        required : "Date is required"
    }
   
},
{
    versionKey:false
}
);

//id doesnt exist so we are adding virtual id
EventSchema.virtual('id',()=>this._id.toHexString());
EventSchema.set('toJSON',{virtuals:true});

//Event is the connection name and EventSchema is the schema

const Event=Mongoose.model('Event',EventSchema);

export default Event;

