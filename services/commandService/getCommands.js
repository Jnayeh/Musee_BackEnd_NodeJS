const Command = require("../../models/command.js");

const getCommands = async (req, res, filter) => {
  Command.find(filter)
    .populate("client")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getCommands;
