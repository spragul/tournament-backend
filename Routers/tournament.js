const express = require('express');
const router = express.Router();
const tournamentControll =require('../Controllers/tournamentControll')
//router
router.get('/',tournamentControll.getalltournamentdata);
router.get('/:id',tournamentControll.getonetournamentdata);
router.post('/adddata',tournamentControll.addData);
router.put('/update/:id',tournamentControll.updatetournament);
router.delete('/delete/:id',tournamentControll.deletetournament);
router.patch('/winner/:id',tournamentControll.winnerlistadd);
module.exports= router