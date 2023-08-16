const express = require('express');
const router = express.Router();
const participantControll =require('../Controllers/ParticipantControll')
//router
router.get('/',participantControll.getallparticipantsdata);
router.get('/:id',participantControll.getoneparticipantsdata);
router.post('/adddata/:id',participantControll.addData);
router.put('/update/:id',participantControll.updateparticipants);
router.delete('/delete/:id',participantControll.deleteparticipants);
module.exports= router

