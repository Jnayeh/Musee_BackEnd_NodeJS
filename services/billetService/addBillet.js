const Billet = require("../../models/billets.js");
const Periode = require("../../models/periodes.js");
const saveImg = require("../saveImage.js");

const addBillet = async (req, res) => {
  if (req.body.billet) {
    const _billet = new Billet(JSON.parse(req.body.billet));

    // VALIDATE INPUT
    if (
      _billet.libele &&
      _billet.description &&
      _billet.periode &&
      _billet.periode !== ""
    ) {
      if (req.files) {
        saveImg(req, _billet, "./billet_images/", "front_image", null);

        saveImg(req, _billet, "./billet_images/", "back_image", null);
      }
      _billet
        .save()
        .then(async (result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: "Server side error" });
        });
    } else {
      res.status(400).send({ error: "All inputs are required" });
    }
  } else {
    res.status(400).send({
      error: "WRONG DATA FORMAT",
    });
  }
};
module.exports = addBillet;
