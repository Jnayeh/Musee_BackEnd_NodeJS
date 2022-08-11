const mongoose = require("mongoose");

//    MongoDB URL
//const url = "mongodb+srv://root:1001@boloticdb.g5x5o.mongodb.net/boloticDB?retryWrites=true&w=majority";
const url = "mongodb://127.0.0.1:27017/MuseeDB";
exports.connect = (config) => {
  // CONNECT MONGOOSE

  mongoose
    .connect(url, { useNewUrlParser: true })
    .catch((err) => config.log().fatal(err));

  // CHECKING CONNECTION
  const db = mongoose.connection;
  db.once("open", (_) => {
    config.log().info("Database connected:", url);
  });

  db.on("error", (err) => {
    config.log().fatal("connection error: \n", err);
  });
};
