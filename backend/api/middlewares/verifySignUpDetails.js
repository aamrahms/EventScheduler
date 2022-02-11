import models from '../models/index.js';
import bcryptjs from 'bcryptjs';

const User = models.User

/**
 * Set a 500 error response
 * 
 * @param {*} message the message if there is an error (returned from catch block)
 * @param {*} res will return 500 response status code if there is an error
 */
const setErrorResponse = (message, res) => {
    res.status(500);
    res.json({ error: message });
}

/**
 * Set a 400 authentication error response
 * 
 * @param {*} message the message if there is an error (returned from catch block)
 * @param {*} res will return 500 response status code if there is an error
 */
const setAuthErrorResponse = (message, res) => {
    res.status(400);
    res.json({ message: message });
}




const checkForDuplicateUnameEmail = (req, res, next) => {
    // check if username is already present in db
    User.findOne({
        userName: req.body.userName
    }).exec((error, user) => {
        if (error) {
            setErrorResponse(error.message, res)
            return;
        }
        if (user) {
            setAuthErrorResponse("User already exists!", res)
            return;
        }



        // check if email already exists in db
        User.findOne({
            email: req.body.email
        }).exec((error, user) => {
            if (error) {
                setErrorResponse(error.message, res)
                return;
            }
            if (user) {
                setAuthErrorResponse("Email aready in use!", res)
                return;
            }

            next();
        })
    })
}


const checkExistingUser = (req, res, next) => {
    User.findOne({
        userName: req.body.userName
    }).exec((error, user) => {
        if (!user) {
            setAuthErrorResponse("User doesn't exist! Please Sign-Up!", res)
            return;
        }
        if (error) {
            setAuthErrorResponse(error.message, res)
            return;
        }
        next();

    }
    );
}


export default { checkForDuplicateUnameEmail, checkExistingUser }