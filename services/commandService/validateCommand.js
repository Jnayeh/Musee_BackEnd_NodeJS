const Command = require("../../models/command");
const updateStock = require("./UpdateStock");

const validateCommand = async (req, res) => {
  const _id = req.params.id;

  const _comm = await Command.findById(_id).populate("client");
  if (_comm) {
    await updateStock(res, _comm.panier);

    Command.findByIdAndUpdate(
      _id,
      { validated: true },
      {
        new: true,
      }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.status(404).send({
      error: "COMMAND NOT FOUND",
    });
  }
};
module.exports = validateCommand;
