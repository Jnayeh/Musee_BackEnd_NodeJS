const Piece = require("../../models/pieces");

const deletePiece = async (req, res) => {
  const _id = req.params.id;
  const old_piece = await Piece.findById(_id);
  //La famma piece od5el
  if (old_piece) {
    Piece.deleteOne({ _id })
      .then(() => {
        res.send({ success: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.status(404).send({ error: "PIECE NOT FOUND" });
  }
};

module.exports = deletePiece;
