import authRouter from './authRoutes/authRoute.js'

import CardLayoutRouter from './CardLayout/CardLayout.js'

export default (app) => {
    //call is made to /api/users when User related information changes
    app.use('/api/users', authRouter)
     //call is made to /api/events when event related information changes
    app.use('/api/events',CardLayoutRouter)
    
}
