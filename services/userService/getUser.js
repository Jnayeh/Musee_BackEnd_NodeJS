const User = require("../../models/users.js");

const getUser = async (req, res, role) => {
  const _id = req.params.id;
  User.findOne({ _id, role })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({
          error: "USER NOT FOUND",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = getUser;
