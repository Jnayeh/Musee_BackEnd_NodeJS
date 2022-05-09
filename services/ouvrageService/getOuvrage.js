const Ouvrage = require("../../models/ouvrages");

const getOuvrage = async (req, res, role) => {
  const _id = req.params.id;
  Ouvrage.findById(_id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          error: "OUVRAGE NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getOuvrage;
