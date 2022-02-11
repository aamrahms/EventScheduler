import Mongoose from "mongoose";

/**
 * Create user schema
 */

const UserSchema = new Mongoose.Schema({
    "email": {
        type: String,
        required: "Email is a required field."
    },
    "familyName": {
        type: String,
        required: "Family name is a required field."
    },
    "givenName": {
        type: String,
        required: "Given name is a required field."
    },
    "userName": {
        type: String,
        required: "Username is a required field."
    },
    "name": {
        type: String,
        required: "Name is a required field."
    },
    "imageUrl": {
        type: String,
    },
    "password": {
        type: String,
        required: "Password is a required field."
    },
    "createdDate": {
        type: Date,
        default: Date.now
    },
    "role": {
        type: String,
        default: "user"
    }

},
{
    versionKey: false
})

/**
 * Use this collection
 */
 const User = Mongoose.model('User', UserSchema)

 /**
  * Default export
  */
 export default User