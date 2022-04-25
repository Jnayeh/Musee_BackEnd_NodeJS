const User = require("../../models/users.js");
const bcrypt = require("bcryptjs");
const createToken = require("../createToken");

const addUser = async (req, res, role) => {
  const _user = new User(req.body);
  // VALIDATE INPUT
  if (_user.email && _user.mot_de_passe && _user.nom && _user.prenom) {
    // ENCRYPTING mot_de_passe
    _user.mot_de_passe = await bcrypt.hash(_user.mot_de_passe, 10);

    // CONVERT EMAIL TO LOWERCASE
    _user.email = _user.email.toLowerCase();
    const oldUser = await User.findOne({
      email: _user.email,
    });

    if (oldUser) {
      return res.status(409).send({
        error: "User Already Exist. Please Login",
      });
    } else {
      _user.role = role;

      _user
        .save()
        .then((result) => {
          let token = createToken(result);
          // RETURN TOKEN
          res.cookie("token", token, { httpOnly: true });
          res.json({ token });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            error: "Server side error",
          });
        });
    }
  } else {
    res.status(400).send({
      error: "All input are required",
    });
  }
};
module.exports = addUser;
