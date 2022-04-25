const User = require("../../models/users.js");
const saveImg = require("../saveImage");
const update = async (req, res, role, photo_folder) => {
  if (req.body.user) {
    let _id = req.params.id;
    let _user = new User(JSON.parse(req.body.user));
    let old_user = await User.findOne({ _id, role }).select("+mot_de_passe");
    console.log(old_user);
    if (old_user) {
      _user._id = _id;

      // CONVERT EMAIL TO LOWERCASE
      _user.email = _user.email.toLowerCase();
      if (req.files) {
        saveImg(req, _user, photo_folder, "photo", old_user.photo);
      }
      _user.mot_de_passe = old_user.mot_de_passe;
      console.log(_user);
      console.log(old_user);
      User.findByIdAndUpdate(_id, _user, {
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
      res.status(404).send({
        error: "USER NOT FOUND",
      });
    }
  } else {
    res.status(400).send({
      error: "WRONG DATA FORMAT",
    });
  }
};
module.exports = update;
