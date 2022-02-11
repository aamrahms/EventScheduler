import Mongoose from "mongoose";

/**
 * Create user schema
 */

const roleSchema = new Mongoose.Schema({
    "name": {
        type: String
    }

},
{
    versionKey: false
})

/**
 * Use this collection
 */
 const Role = Mongoose.model('Role', roleSchema)

 /**
  * Default export
  */
 export default Role