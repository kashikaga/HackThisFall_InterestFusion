const express = require('express');
const groupRouter = express.Router();
const {createGroup, getAllGroups, getGroup, joinGroup} = require('../controllers/fusionGroup.controller');

groupRouter.post('/create', createGroup);
groupRouter.get('/all', getAllGroups);
groupRouter.get('/:groupId', getGroup);
groupRouter.post('/join', joinGroup);    
 
module.exports = groupRouter;