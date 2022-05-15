const Billet = require("../../models/billets.js");
const Periode = require("../../models/periodes.js");
const saveImg = require("../saveImage");

const updateBillet = async (req, res) => {
  if (req.body.billet) {
    const _id = req.params.id;
    const _billet = new Billet(JSON.parse(req.body.billet));
    const old_billet = await Billet.findById(_id);

    if (old_billet) {
      _billet._id = _id;

      if (req.files) {
        saveImg(
          req,
          _billet,
          "./billet_images/",
          "front_image",
          old_billet.front_image
        );

        saveImg(
          req,
          _billet,
          "./billet_images/",
          "back_image",
          old_billet.back_image
        );
      }

      Billet.findByIdAndUpdate(_id, _billet, {
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
      res.status(404).send({ error: "BILLET NOT FOUND" });
    }
  } else {
    res.status(400).send({
      error: "WRONG DATA FORMAT",
    });
  }
};
module.exports = updateBillet;
