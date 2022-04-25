const Piece = require("../../models/pieces");

const deletePiece = async (req, res) => {
  const _id = req.params.id;

  Piece.findByIdAndDelete(_id)
    .then(() => {
      res.send({ success: "Deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = deletePiece;
