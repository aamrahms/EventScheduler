import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from '../config/config.js'
import routes from './routes/index.js';
import models from './models/index.js';
// import * as authService from './services/authService.js'


const host = config.DB_HOST
const app = express();

// use new parser else set it to false to use old url parser
mongoose.connect(host, {useNewUrlParser: true})
.then(() => {
    console.log("Database connection is successful")
})
.catch(error => {
    console.log("Database connection error:", error)
    process.exit()
})

// mongoose.connect('mongodb://localhost:27017/eventracker').then(() => console.log("done")).catch(err => {
//     console.log("db err")
//     process.exit()
// })

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());

routes(app)

export default app;