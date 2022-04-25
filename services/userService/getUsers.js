const User = require("../../models/users.js");

const getUsers = async (req, res, role) => {
  User.find({ role })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getUsers;
