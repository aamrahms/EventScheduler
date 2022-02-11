import express from 'express';
import * as CardLayoutController from '../../controllers/CardLayout/CardLayout.js';
import {verifyJwtToken} from '../../middlewares/jwtAuth.js'

const router=express.Router();
//when api/events/createEvent is called, post call is initiated
router.route('/createEvent')
    .post(verifyJwtToken, CardLayoutController.saveEvent);
//when api/events/getEvents is called, get call brings back all the events 
router.route('/getEvents')
    .get(CardLayoutController.getAllEvents);
//when api/events/search is called, get events on the basis of query
router.route('/search')
    .get(CardLayoutController.getEventsBySearch)
//when api/events/:id/like is called , when an event is liked, it patches event with user's id. 
router.route('/:id/like')
    .patch(verifyJwtToken, CardLayoutController.likeEvent)
//when api/events/:id/schedule is called , event is scheduled for the user. 
router.route('/:id/schedule')
    .patch(verifyJwtToken, CardLayoutController.scheduleEvent)
//when api/events/:id is called , depending on whether event needs to be deleted or updated, below calls are made 
router.route('/:id')
    .delete(verifyJwtToken, CardLayoutController.deleteEvent)
    .patch(verifyJwtToken, CardLayoutController.updateEvent)
    // .patch(id,CardLayoutController.updateEvent)

export default router;