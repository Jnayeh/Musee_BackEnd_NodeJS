const Periode = require("../../models/periodes.js");
const Piece = require("../../models/pieces.js");
const saveImg = require("../saveImage.js");

const addPiece = async (req, res) => {
  if (req.body.piece) {
    const _piece = new Piece(JSON.parse(req.body.piece));

    // VALIDATE INPUT
    if (
      _piece.libele &&
      _piece.description &&
      _piece.periode &&
      _piece.periode !== ""
    ) {
      //La famma fichiers fel req tod5el w trajja3 piece f west'ha les liens lel images
      if (req.files) {
        saveImg(req, _piece, "./piece_images/", "front_image", null);

        saveImg(req, _piece, "./piece_images/", "back_image", null);
      }

      //Ajout piece
      _piece
        .save()
        //La kol chay wadha7
        .then(async (result) => {
          //trajja3 objet piece
          res.send(result);
        })
        // la fama erreur m serveur
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
