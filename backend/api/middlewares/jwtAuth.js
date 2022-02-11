import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import User from "../models/user/user.js";

const setErrorResponse = (message, res) => {
  res.status(500);
  res.json({error: message});
}

const setAuthErrorResponse = (message, res) => {
  res.status(401);
  res.json({message: message});
}
const setForbiddenErrorResponse = (message, res) => {
  res.status(403);
  res.json({message: message});
}


export const verifyJwtToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isOurToken = token.length < 500

    let decoded

    if(token && isOurToken) {
      decoded = jwt.verify(token, config.secretKey)
      req.userId = decoded?.id
    } else {
      decoded = jwt.decode(token)
      req.userId = decoded?.sub
    }
    next()
  } catch (error) {
    console.log(error)
  }
}


