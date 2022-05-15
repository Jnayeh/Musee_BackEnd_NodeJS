const Periode = require("../../models/periodes");

const addPeriode = async (req, res, role) => {
  const _period = new Periode(req.body);

  // VALIDATE INPUT
  if (_period.details && _period.title && _period.date) {
    _period
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.status(400).send({ error: "All inputs are required" });
  }
};
module.exports = addPeriode;
