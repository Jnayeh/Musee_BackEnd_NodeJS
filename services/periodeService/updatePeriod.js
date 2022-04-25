const Periode = require("../../models/periodes");

const updatePeriode = async (req, res) => {
  const _id = req.params.id;
  const _periode = new Periode(req.body);
  const old_periode = await Periode.findById(_id);

  if (old_periode) {
    _periode._id = _id;

    Periode.findByIdAndUpdate(_id, _periode, {
      new: true,
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Server side error" });
      });
  } else {
    res.send({ error: "Periode NOT FOUND" });
  }
};
module.exports = updatePeriode;
