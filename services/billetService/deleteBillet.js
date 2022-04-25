const Billet = require("../../models/billets");

const deleteBillet = async (req, res) => {
  const _id = req.params.id;

  Billet.findByIdAndDelete(_id)
    .then(() => {
      res.send({ success: "Deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Server side error" });
    });
};
module.exports = deleteBillet;
