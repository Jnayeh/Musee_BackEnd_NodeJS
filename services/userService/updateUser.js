const User = require("../../models/users.js");
const saveImg = require("../saveImage");

// To Decode Token
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const update = async (req, res, role, photo_folder) => {
  //GET TOKEN FROM HEADERS
  const token = req.headers["authorization"];
  const config = process.env;
  // DECODE TOKEN
  const decoded = jwt.verify(token, config.TOKEN_KEY);
  // GET USER ROLE
  const user_role = decoded.role;
  if (req.body.user) {
    let _id = req.params.id;
    let _user = new User(JSON.parse(req.body.user));
    let old_user = await User.findOne({ _id, role }).select("+mot_de_passe");

    if (old_user) {
      _user._id = _id;

      // CONVERT EMAIL TO LOWERCASE
      _user.email = _user.email.toLowerCase();
      if (req.files) {
        saveImg(req, _user, photo_folder, "photo", old_user.photo);
      }
      if (
        _user.mot_de_passe &&
        _user.mot_de_passe != "" &&
        user_role == "administrateur"
      ) {
        _user.mot_de_passe = await bcrypt.hash(_user.mot_de_passe, 10);
      } else {
        _user.mot_de_passe = old_user.mot_de_passe;
      }

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
