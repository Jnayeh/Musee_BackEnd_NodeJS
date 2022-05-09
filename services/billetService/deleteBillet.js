const Billet = require("../../models/billets");

const deleteBillet = async (req, res) => {
  const _id = req.params.id;
  const old_billet = await Billet.findById(_id);
  if (old_billet) {
    Billet.deleteOne({ _id })
      .then(() => {
        res.send({ success: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.status(404).send({ error: "BILLET NOT FOUND" });
  }
};
module.exports = deleteBillet;
