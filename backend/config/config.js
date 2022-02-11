import dotenv from 'dotenv'
dotenv.config()

const DB_HOST = process.env.DB_HOST || 'mongodb+srv://eventtracker:eventtracker@cluster0.g95yn.mongodb.net/tes';
//const DB_HOST = 'mongodb://localhost:27017/eventTracker'
const SERVER_PORT = process.env.SERVER_PORT || 4200;
const secretKey = "eventTracker"

export default { DB_HOST, SERVER_PORT, secretKey }