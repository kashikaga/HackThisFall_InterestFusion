const express = require('express');
const { createEvent, getAllEvents, deleteEvent } = require('../controllers/fusionEvent.controller');


const eventRouter = express.Router();

eventRouter.post('/createevent', createEvent);
eventRouter.get('/allevents', getAllEvents);
eventRouter.delete('/deleteevent/:id', deleteEvent);

module.exports = eventRouter;