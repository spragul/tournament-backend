const mongoose = require('mongoose');
var validator = require('validator');

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    mobile: {
        type: Number,
        required: true
    },
    dob:{
        type:Date,
        required:true
    },
    role: {
        type: String,
        default: "participant"
    },
    tournament:{
      type:String,
      required:false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
let ParticipantModel = mongoose.model('participants', participantSchema);
module.exports = { ParticipantModel };