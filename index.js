
//express--package
const express = require('express');
const app = express()
//dotenv-package
require('dotenv').config();
//cors-package
var cors = require('cors')
app.use(cors())
//body-parse-package
var bodyParser = require('body-parser');
app.use(bodyParser.json())

//Geting router
var participantRouter=require('./Routers/participant');
var tournamentRouter=require('./Routers/tournament');

//use Router
app.use('/participant',participantRouter);
app.use('/tournament',tournamentRouter);



app.listen(process.env.PORT || '9000', () => (console.log("localhost:9000")))