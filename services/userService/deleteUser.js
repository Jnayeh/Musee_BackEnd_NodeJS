const User = require("../../models/users.js");
const deleteImg = require("../deleteImg.js");

const deleteUser = async (req, res, role, directory) => {
  const _id = req.params.id;

  User.findOneAndDelete({ _id, role })
    .then((result) => {
      res.send({ success: "Deleted successfully" });
      if (result) {
        deleteImg(directory, result.photo);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = deleteUser;
