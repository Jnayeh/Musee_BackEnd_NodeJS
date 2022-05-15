const Periode = require("../../models/periodes.js");
const Piece = require("../../models/pieces.js");
const saveImg = require("../saveImage");

const updatePiece = async (req, res) => {
  // Ychouf el forme mta3 les donnée
  if (req.body.piece) {
    const _id = req.params.id;
    const _piece = new Piece(JSON.parse(req.body.piece));
    const old_piece = await Piece.findById(_id);
    // La famma mennou yod5el
    if (old_piece) {
      _piece._id = _id;
      // Fazet les fichiers
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
          //trajja3 objet piece
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
