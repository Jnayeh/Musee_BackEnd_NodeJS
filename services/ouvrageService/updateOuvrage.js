const Ouvrage = require("../../models/ouvrages.js");
const saveImg = require("../saveImage");

const updateOuvrage = async (req, res) => {
  if (req.body.ouvrage) {
    const _id = req.params.id;
    const _ouvrage = new Ouvrage(JSON.parse(req.body.ouvrage));
    const old_ouvrage = await Ouvrage.findById(_id);

    if (old_ouvrage) {
      _ouvrage._id = _id;

      if (req.files) {
        saveImg(
          req,
          _ouvrage,
          "./ouvrage_images/",
          "front_image",
          old_ouvrage.front_image
        );
      }

      Ouvrage.findByIdAndUpdate(_id, _ouvrage, {
        new: true,
      })
        .then(async (result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ error: "Server side error" });
        });
    } else {
      res.status(404).send({ error: "OUVRAGE NOT FOUND" });
    }
  } else {
    res.status(400).send({
      error: "WRONG DATA FORMAT",
    });
  }
};
module.exports = updateOuvrage;
