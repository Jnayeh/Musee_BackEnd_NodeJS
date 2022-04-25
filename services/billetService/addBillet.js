const Billet = require("../../models/billets.js");
const Periode = require("../../models/periodes.js");
const saveImg = require("../saveImage.js");

const addBillet = async (req, res, role) => {
  if (req.body.billet) {
    if (req.body.billet._id === null) {
      delete req.body.billet._id;
    }

    const _billet = new Billet(JSON.parse(req.body.billet));

    // VALIDATE INPUT
    if (_billet.libele && _billet.description) {
      if (req.files) {
        saveImg(req, _billet, "./billet_images/", "front_image", null);

        saveImg(req, _billet, "./billet_images/", "back_image", null);
      }
      _billet
        .save()
        .then(async (result) => {
          if (_billet.periode) {
            await Periode.findByIdAndUpdate(
              _billet.periode,
              { $push: { pieces: result._id } },
              { new: true, useFindAndModify: false }
            );
          }
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
