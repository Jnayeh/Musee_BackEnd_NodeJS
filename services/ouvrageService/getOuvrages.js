const Ouvrage = require("../../models/ouvrages");

const getOuvrages = async (req, res, filter) => {
  Ouvrage.find(filter)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getOuvrages;
