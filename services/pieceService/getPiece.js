const Piece = require("../../models/pieces");

const getPiece = async (req, res, role) => {
  const _id = req.params.id;
  Piece.findById(_id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          error: "PIECE NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getPiece;
