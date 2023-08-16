const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    gamename: {
        type: String,
        required: true
    },
    image:{
      type:String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "tournment"
    },
    participant: {
        type: Array,
        required: false
    },
    startingdate: {
        type: Date,
        required: true
    },
    endingdate: {
        type: Date,
        required: true
    },
    winners: {
        type:Array,
        required:false
    },
    inchargename:{
        type:String,
        required:true
    }
});
let tournamenttModel = mongoose.model('tournament', tournamentSchema);
module.exports = { tournamenttModel };