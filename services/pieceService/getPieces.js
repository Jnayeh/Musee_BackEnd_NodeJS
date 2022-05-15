const Piece = require("../../models/pieces.js");

const getPieces = async (req, res, filter) => {
  //Yrajja3 liste des pieces 7asb el filter
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
