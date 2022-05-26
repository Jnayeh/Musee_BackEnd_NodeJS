require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const path = require("path");
const morgan = require("morgan");

const fileUpload = require("express-fileupload");
const cors = require("cors");
const _ = require("lodash");

//Routes
const AdminRoutes = require("./routes/AdminRoutes");
const UserRoutes = require("./routes/UserRoutes");
const PieceRoutes = require("./routes/PieceRoutes");
const PeriodeRoutes = require("./routes/PeriodeRoutes");
const BilletRoutes = require("./routes/BilletRoutes");
const OuvrageRoutes = require("./routes/OuvrageRoutes");
const CommandRoutes = require("./routes/CommandRoutes");

//Express App
const app = express();

app.use(cors());

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Listen to port
app.listen(process.env.PORT || 5000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

//       STATIC FILES
// FILES THAT WE WANT TO GET FROM BACKEND SERVER
//PHOTOS

// FILES
app.use("/user", express.static(path.join(__dirname, "user_photos")));
app.use("/admin", express.static(path.join(__dirname, "admin_photos")));
app.use("/piece_images", express.static(path.join(__dirname, "piece_images")));
app.use(
  "/billet_images",
  express.static(path.join(__dirname, "billet_images"))
);
app.use(
  "/ouvrage_images",
  express.static(path.join(__dirname, "ouvrage_images"))
);

//     LOGS
app.use(morgan("dev"));

//       USE ROUTES
app.use(UserRoutes);
app.use(AdminRoutes);
app.use(PieceRoutes);
app.use(BilletRoutes);
app.use(PeriodeRoutes);
app.use(OuvrageRoutes);
app.use(CommandRoutes);

// // //    ERRORS SHOULD ALWAYS BE AFTER EVERYTHING
app.use((req, res) => {
  res.status(404).send({
    error: {
      message: "Undefied Route",
      code: "404",
    },
  });
});
