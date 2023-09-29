const express = require('express');
const router = express.Router();
const tournamentControll =require('../Controllers/tournamentControll')
const  {validate } = require('../Authentication/auth');
//router
router.get('/',validate,tournamentControll.getalltournamentdata);
router.get('/:id',validate,tournamentControll.getonetournamentdata);
router.post('/adddata',validate,tournamentControll.addData);
router.put('/update/:id',validate,tournamentControll.updatetournament);
router.delete('/delete/:id',validate,tournamentControll.deletetournament);
router.patch('/winner/:id',validate,tournamentControll.winnerlistadd);
module.exports= router