const User = require("../../models/users.js");
const bcrypt = require("bcryptjs");
const createToken = require("../createToken");

const login = async (req, res, role) => {
  // GET INPUT
  let email = req.body.email;
  let mot_de_passe = req.body.mot_de_passe;

  // VALIDATE INPUT
  if (email && mot_de_passe) {
    //TRANSFORM EMAIL
    email = email.toLowerCase();
    // VALIDATE USER
    const _user = await User.findOne({ email, role }).select("+mot_de_passe");

    // La famma user
    // Ta3mel comparaison bin el mot de pase elli crypted welli ena 7attou
    if (_user && (await bcrypt.compare(mot_de_passe, _user.mot_de_passe))) {
      let token = createToken(_user);
      // RETURN TOKEN
      /* res.cookie("token", token, {
        // expires works the same as the maxAge
        expires: new Date("01 12 2023"),
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      }); */

      res.json({ token });
    } else {
      res.status(400).send({
        error: "Invalid Credentials",
      });
    }
  } else {
    res.status(400).send({
      error: "All input are required",
    });
  }
};
module.exports = login;
