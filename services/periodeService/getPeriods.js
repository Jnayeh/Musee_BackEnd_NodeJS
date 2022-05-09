const Periode = require("../../models/periodes");

const getPeriodes = async (req, res, filter) => {
  Periode.find(filter)
    .sort({ order: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getPeriodes;
