const Ouvrage = require("../../models/ouvrages.js");
const saveImg = require("../saveImage.js");

const addOuvrage = async (req, res, role) => {
  if (req.body.ouvrage) {
    const _ouvrage = new Ouvrage(JSON.parse(req.body.ouvrage));

    // VALIDATE INPUT
    if (_ouvrage.libele && _ouvrage.description && _ouvrage.prix) {
      if (req.files) {
        saveImg(req, _ouvrage, "./ouvrage_images/", "front_image", null);
      }
      _ouvrage
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
module.exports = addOuvrage;
