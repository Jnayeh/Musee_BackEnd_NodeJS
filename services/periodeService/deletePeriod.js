const Periode = require("../../models/periodes");

const deletePeriode = async (req, res) => {
  const _id = req.params.id;

  const old_periode = await Periode.findById(_id);

  if (old_periode) {
    Periode.deleteOne({ _id })
      .then(() => {
        res.send({ success: "Deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.status(404).send({ error: "PERIODE NOT FOUND" });
  }
};
module.exports = deletePeriode;
