const Billet = require("../../models/billets");

const getBillet = async (req, res, role) => {
  const _id = req.params.id;
  Billet.findById(_id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          error: "BILLET NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getBillet;
/* {} */
