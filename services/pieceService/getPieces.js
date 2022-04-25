const Piece = require("../../models/pieces.js");

const getPieces = async (req, res, filter) => {
  Piece.find(filter)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getPieces;
