const Billet = require("../../models/billets.js");

const getBillets = async (req, res, filter) => {
  Billet.find(filter)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getBillets;
