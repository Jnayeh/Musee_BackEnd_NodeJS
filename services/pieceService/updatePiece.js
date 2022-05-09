const Periode = require("../../models/periodes.js");
const Piece = require("../../models/pieces.js");
const saveImg = require("../saveImage");

const updatePiece = async (req, res) => {
  if (req.body.piece) {
    const _id = req.params.id;
    const _piece = new Piece(JSON.parse(req.body.piece));
    const old_piece = await Piece.findById(_id);

    if (old_piece) {
      _piece._id = _id;

      if (req.files) {
        saveImg(
          req,
          _piece,
          "./piece_images/",
          "front_image",
          old_piece.front_image
        );

        saveImg(
          req,
          _piece,
          "./piece_images/",
          "back_image",
          old_piece.back_image
        );
      }

      Piece.findByIdAndUpdate(_id, _piece, {
        new: true,
      })
        .then(async (result) => {
          if (old_piece.periode != _piece.periode) {
            await Periode.findByIdAndUpdate(
              old_piece.periode,
              { $pull: { pieces: _piece._id } },
              { multi: true }
            );
            await Periode.findByIdAndUpdate(
              result.periode,
              { $push: { pieces: result._id } },
              { new: true, useFindAndModify: false }
            );
          }
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: "Server side error" });
        });
    } else {
      res.status(404).send({ error: "PIECE NOT FOUND" });
    }
  } else {
    res.status(400).send({
      error: "WRONG DATA FORMAT",
    });
  }
};
module.exports = updatePiece;
