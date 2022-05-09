const Ouvrage = require("../../models/ouvrages");

const deleteOuvrage = async (req, res) => {
  const _id = req.params.id;
  const old_ouvrage = await Ouvrage.findById(_id);
  if (old_ouvrage) {
    Ouvrage.deleteOne({ _id })
      .then(() => {
        res.send({ success: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.status(404).send({ error: "OUVRAGE NOT FOUND" });
  }
};
module.exports = deleteOuvrage;
