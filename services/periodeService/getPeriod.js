const Periode = require("../../models/periodes");

const getPeriode = async (req, res, role) => {
  const _id = req.params.id;
  Periode.findById(_id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          error: "PERIODE NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getPeriode;
