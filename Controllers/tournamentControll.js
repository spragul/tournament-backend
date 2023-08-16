const mongoose = require('mongoose');
const { URL } = require('../Dbconfig/Dbconfig');
const { tournamenttModel } = require('../Model/tournament_Schemas');
const { ParticipantModel } = require('../Model/participants_schemas');
mongoose.connect(URL)
  .then(() => console.log('Connected!'));
//get all data
exports.getalltournamentdata = async (req, res) => {
  try {
    let Data = await tournamenttModel.find();
    if (Data) {
      res.status(200).send({
        Data,
        rd: true,
        message: 'Data fetching successfull'
      })
    } else {
      res.status(204).send({
        rd: false,
        message: 'tournament Data Empty'
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
exports.getonetournamentdata = async (req, res) => {
  try {
    let Data = await tournamenttModel.findOne({ _id: req.params.id });
    if (Data) {
      res.status(200).send({
        Data,
        rd: true,
        message: 'Data fetching successfull'
      })
    } else {
      res.status(204).send({
        rd: false,
        message: 'invalid tournament Id '
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
//Add a tournament Data
exports.addData = async (req, res) => {
  try {
    let tournament = req.body.gamename;
    let olddata = await tournamenttModel.findOne({ gamename: req.body.gamename });
    if (tournament) {
      if (!olddata) {
        let a = await tournamenttModel.create(req.body);
        res.status(200).send({ rd: true, message: "tournament Data Add Successfull" })
      } else {
        res.status(204).send({ rd: true, message: "Already tournament added" })
      }
    } else {
      res.status(204).send({ rd: false, message: 'Data empty' })
    }


  } catch (error) {
    console.log(error);
    res.status(500).send({
      rd: false,
      message: `Internal server error or ${error}`
    })
  }
}
//update tournament Data
exports.updatetournament = async (req, res) => {
  try {
    let tournament = await tournamenttModel.findOne({ _id: req.params.id });
    if (tournament.gamename === req.body.gamename) {
      if (tournament) {
        tournament.gamename = req.body.gamename
        tournament.image = req.body.image
        tournament.description = req.body.description
        tournament.mobile = req.body.mobile
        tournament.startingdate = req.body.startingdate
        tournament.endingdate = req.body.endingdate
        tournament.inchargename = req.body.inchargename
        await tournament.save()
        res.status(200).send({
          tournament,
          rd: true,
          message: "tournament update successfully"
        })
      } else {
        res.status(400).send({ rd: false, message: "tournament not exit" })
      }
    } else {
      let list = tournament.participant;
      for (let i = 0; i < list.length; i++) {
        let data = await ParticipantModel.findOne({ name: list[i] });
        if (data.tournament === tournament.gamename) {
          await ParticipantModel.findByIdAndUpdate({ _id: data._id }, { $set: { tournament: req.body.gamename } })
        }
      }
      if (tournament) {
        tournament.gamename = req.body.gamename
        tournament.image = req.body.image
        tournament.description = req.body.description
        tournament.mobile = req.body.mobile
        tournament.startingdate = req.body.startingdate
        tournament.endingdate = req.body.endingdate
        tournament.inchargename = req.body.inchargename
        await tournament.save()
        res.status(200).send({
          tournament,
          rd: true,
          message: "tournament update successfully"
        })
      } else {
        res.status(400).send({ rd: false, message: "tournament not exit" })
      }
    }

  } catch (error) {
    res.status(500).send({ rd: false, message: `internal server error${error}` })
  }

}

//delete tournament
exports.deletetournament = async (req, res) => {
  try {
    let tournament = await tournamenttModel.findOne({ _id: req.params.id })
    if (tournament) {
      let participant = tournament.participant;
      for (let i = 0; i < participant.length; i++) {
        let name = participant[i];
        let a = await ParticipantModel.findOne({ name: name });
        if (a.tournament === tournament.gamename) {
          await ParticipantModel.deleteOne({ _id: a._id })
        }
      }

      await tournamenttModel.deleteOne({ _id: req.params.id })
      res.status(200).send({
        rd: true,
        message: "tournament Deleted Successfull!"
      })
    }
    else {
      res.status(400).send({ rd: false, message: "tournament Does Not Exists!" })
    }

  } catch (error) {
    res.status(500).send({
      rd: false,
      message: `Internal Server Error ${error}`
    })

  }
}

exports.winnerlistadd = async (req, res) => {
  try {
    let winner = await tournamenttModel.findOne({ _id: req.params.id });
    if (req.body.name !=='') {
      if (winner) {
        await tournamenttModel.findByIdAndUpdate({ _id: req.params.id }, { $push: { winners: { name: req.body.name, prize: req.body.prize } } });
        res.status(200).send({ rd: true, message: "Winner added" })
      } else {
        res.status(400).send({ rd: true, message: 'tournament not exists' });
      }
    }
  } catch (error) {
    res.status(500).send({
      rd: false,
      message: `Internal Server Error ${error}`
    })

  }
}