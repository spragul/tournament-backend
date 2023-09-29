const express = require('express');
const router = express.Router();
const participantControll =require('../Controllers/ParticipantControll')
const  {validate } = require('../Authentication/auth');
//router
router.get('/',validate,participantControll.getallparticipantsdata);
router.get('/:id',validate,participantControll.getoneparticipantsdata);
router.post('/adddata/:id',validate,participantControll.addData);
router.put('/update/:id',validate,participantControll.updateparticipants);
router.delete('/delete/:id',validate,participantControll.deleteparticipants);
module.exports= router

