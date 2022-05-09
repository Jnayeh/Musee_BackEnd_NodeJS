const Periode = require("../../models/periodes.js");
const Piece = require("../../models/pieces.js");
const saveImg = require("../saveImage.js");

const addPiece = async (req, res, role) => {
  if (req.body.piece) {
    if (req.body.piece._id === null) {
      delete req.body.piece._id;
    }

    const _piece = new Piece(JSON.parse(req.body.piece));

    // VALIDATE INPUT
    if (
      _piece.libele &&
      _piece.description &&
      _piece.periode &&
      _piece.periode !== ""
    ) {
      if (req.files) {
        saveImg(req, _piece, "./piece_images/", "front_image", null);

        saveImg(req, _piece, "./piece_images/", "back_image", null);
      }
      _piece
        .save()
        .then(async (result) => {
          if (_piece.periode) {
            await Periode.findByIdAndUpdate(
              _piece.periode,
              { $push: { pieces: result._id } },
              { new: true, useFindAndModify: false }
            );
          }
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: "Server side error" });
        });
    } else {
      res.status(400).send({ error: "All inputs are required" });
    }
  } else {
    res.status(400).send({
      error: "WRONG DATA FORMAT",
    });
  }
};
module.exports = addPiece;
