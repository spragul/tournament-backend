const mongoose = require('mongoose');
const { URL } = require('../Dbconfig/Dbconfig');
const { ParticipantModel } = require('../Model/participants_schemas');
const { tournamenttModel } = require('../Model/tournament_Schemas');
mongoose.connect(URL)
  .then(() => console.log('Connected!'));
//get all data
exports.getallparticipantsdata = async (req, res) => {
  try {
    let personData = await ParticipantModel.find();
    if (personData) {
      res.status(200).send({
        personData,
        rd: true,
        message: 'Data fetching successfull'
      })
    } else {
      res.status(204).send({
        rd: false,
        message: 'participant Data Empty'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      rd: false,
      message: `Internal Server Error ${error}`
    })

  }
}
//get perticular person data data
exports.getoneparticipantsdata = async (req, res) => {
  try {
    let personData = await ParticipantModel.findOne({ _id: req.params.id });
    if (personData) {
      res.status(200).send({
        personData,
        rd: true,
        message: 'Data fetching successfull'
      })
    } else {
      res.status(204).send({
        rd: false,
        message: 'invalid participant Id '
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      rd: false,
      message: `Internal Server Error ${error}`
    })

  }
}
//Add a participants Data
exports.addData = async (req, res) => {
  try {
    let newperson = req.body.name;
    let game_id = req.params.id;
    if (game_id) {
      //body data check
      if (newperson) {
        let data = await ParticipantModel.create(req.body);
        res.status(200).send({ rd: true, message: "participants Data Add Successfull" })
        //add participant data in tournament 
        let game = await tournamenttModel.findOneAndUpdate(
          {
            _id: game_id
          },
          {
            $push: { participant: newperson }
          }
        );
        //geting tournament data
        let gamedata = await tournamenttModel.findOne({ _id: game_id })
        //add tournament data in  participant
        let part = await ParticipantModel.findOneAndUpdate(
          {
            _id: data._id
          },
          {
            $set: { tournament: gamedata.gamename }
          }
        );
      } else {
        res.status(204).send({ rd: false, message: 'Data empty' })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      rd: false,
      message: `Internal server error or ${error}`
    })
  }
}
//update participants Data
exports.updateparticipants = async (req, res) => {
  try {
    let participant = await ParticipantModel.findOne({ _id: req.params.id })
    if (participant.tournament === req.body.tournament) {
      if (participant) {
        participant.name = req.body.name
        participant.image = req.body.image
        participant.email = req.body.email
        participant.mobile = req.body.mobile
        participant.dob = req.body.dob
        participant.tournament = req.body.tournament
        await participant.save()
        res.status(200).send({
          participant,
          rd: true,
          message: "participant update successfully"
        })
      } else {
        res.status(400).send({ rd: false, message: "participant not exit" })
      }

    } else {
      //old tournament name will be delete
      let r = await tournamenttModel.findOne({ gamename: participant.tournament });
      let _id = r._id;
      let a = await tournamenttModel.findByIdAndUpdate(_id, { $pullAll: { participant: [participant.name] } });
      //add participant data in tournament 
      let game = await tournamenttModel.findOneAndUpdate(
        {
          gamename: req.body.tournament
        },
        {
          $push: { participant: participant.name }
        }
      );
      if (participant) {
        participant.name = req.body.name
        participant.image = req.body.image
        participant.email = req.body.email
        participant.mobile = req.body.mobile
        participant.dob = req.body.dob
        participant.tournament = req.body.tournament
        await participant.save()
        res.status(200).send({
          participant,
          rd: true,
          message: "participant update successfully"
        })
      } else {
        res.status(400).send({ rd: false, message: "participant not exit" })
      }
    }

  } catch (error) {
    res.status(500).send({ rd: false, message: `internal server error${error}` })
  }

}

//delete participant
exports.deleteparticipants = async (req, res) => {
  try {
    let participant = await ParticipantModel.findOne({ _id: req.params.id })
    if (participant) {
      let gamename = participant.tournament;
      let r = await tournamenttModel.findOne({ gamename });
      let _id = r._id;
      let a = await tournamenttModel.findByIdAndUpdate(_id, { $pullAll: { participant: [participant.name] } })
      await ParticipantModel.deleteOne({ _id: req.params.id })
      res.status(200).send({
        rd: true,
        message: "participant Deleted Successfull!"
      })
    }
    else {
      res.status(400).send({ rd: false, message: "participant Does Not Exists!" })
    }

  } catch (error) {
    res.status(500).send({
      rd: false,
      message: `Internal Server Error ${error}`
    })

  }
}

