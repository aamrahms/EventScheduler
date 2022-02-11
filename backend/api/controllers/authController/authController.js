import { response } from 'express'
import * as authService from '../../services/authService.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/user/user.js'
import config from '../../../config/config.js'

/**
 * Set a success response
 * 
 * @param {*} data take the response of the query and returns as JSON
 * @param {*} res server response if call is successful
 */
const setSuccessResponse = (data, res) => {
    res.status(200);
    res.json(data)
}

/**
 * Set a error response
 * 
 * @param {*} message the message if there is an error (returned from catch block)
 * @param {*} res will return 500 response status code if there is an error
 */
const setErrorResponse = (message, res) => {
    res.status(500);
    res.json({ error: message });
}

export const signup = async (req, res) => {
    try {
        const user = {
            ...req.body, name: req.body.givenName + ' ' + req.body.familyName,
            password: bcryptjs.hashSync(req.body.password, 8),
        }
        const newUser = await authService.signup(user).then()
        const userData = newUser.toJSON()
        delete userData['password']

        let token = jwt.sign({ id: newUser?._id }, config.secretKey, {
            // 24 hours
            expiresIn: 86400
        });

        setSuccessResponse({ newUser: userData, tokenId: token }, res)
    } catch (e) {
        setErrorResponse(e.message, res)
    }
};


export const login = async (req, res) => {
    try {
        const userName = req.body.userName
        const password = req.body.password

        const loginUser = await authService.login(userName)

        let passwordIsValid = bcryptjs.compareSync(
            password,
             loginUser.password
         );
 
         if (!passwordIsValid) {
            setErrorResponse("Invalid Password!", res)
             return res.status(400).send({
                 token: null,
                 message: "Invalid Password!"
             });
         }
        let token = jwt.sign({ id: loginUser?._id }, config.secretKey, {
            // 24 hours
            expiresIn: 86400
        });
        setSuccessResponse({ newUser: loginUser, tokenId: token }, res)

    } catch (e) {
        setErrorResponse(e.message , res)
    }


}