const User = require("../../models/users.js");
const bcrypt = require("bcryptjs");

const changeMdp = async (req, res, role) => {
  const _id = req.params.id;
  //Gets user from DB to check the passwords
  const _user = await User.findOne({ _id, role }).select("+mot_de_passe");
  if (_user) {
    old_mdp = req.body.mot_de_passe;
    new_mdp = req.body.new_mot_de_passe;
    //Input checks
    if (!old_mdp) {
      res.status(400).send({
        error: "old password required",
      });
    } else if (!new_mdp) {
      res.status(400).send({
        error: "new password required",
      });
    }
    //Looks if the password matches the old password
    else if (await bcrypt.compare(old_mdp, _user.mot_de_passe)) {
      //New password encrypted
      let mot_de_passe = await bcrypt.hash(new_mdp, 10);
      User.updateOne({ _id }, { mot_de_passe })
        .then(() => {
          res.send({
            success: "Password changed successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ error: "Server side error" });
        });
    } else {
      res.status(400).send({
        error: "wrong password",
      });
    }
  } else {
    res.status(404).send({
      error: "USER NOT FOUND",
    });
  }
};
module.exports = changeMdp;
