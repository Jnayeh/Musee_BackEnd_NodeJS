const Command = require("../../models/command.js");

const addCommand = async (req, res, role) => {
  const _com = new Command(req.body);
  // VALIDATE INPUT
  if (_com.email && _com.nom && _com.prenom) {
    _com
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          error: "Server side error",
        });
      });
  } else {
    res.status(400).send({
      error: "All input are required",
    });
  }
};
module.exports = addCommand;
