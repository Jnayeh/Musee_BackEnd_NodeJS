require("dotenv").config();

// CONFIG
const config = require("./config")[process.env.NODE_ENV || "developement"];

//Logging
const log = config.log();

/** MODULES */

/**
 * Eases making a lot of node instances on pc
 */
const cluster = require("cluster");
const os = require("os");

const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const fileUpload = require("express-fileupload");
const cors = require("cors");
const _ = require("lodash");

// Routes
const AdminRoutes = require("./routes/AdminRoutes");
const UserRoutes = require("./routes/UserRoutes");
const PieceRoutes = require("./routes/PieceRoutes");
const PeriodeRoutes = require("./routes/PeriodeRoutes");
const BilletRoutes = require("./routes/BilletRoutes");
const OuvrageRoutes = require("./routes/OuvrageRoutes");
const CommandRoutes = require("./routes/CommandRoutes");
const compression = require("compression");

// Express App
const app = express(config);

// Helmet security
/* app.use(helmet()); */

// running CPU number
const numCPUs = os.cpus().length;

/* if (cluster.isMaster) {
  log.info(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    log.fatal(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  
} */
require("./config/database").connect(config);
// Listen to port
app.listen(process.env.PORT || 5000, function () {
  log.info(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
app.use(cors());

// response compression
app.use(compression());

//  enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// data encoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//        STATIC FILES
//  FILES THAT WE WANT TO GET FROM BACKEND SERVER
//  PHOTOS

//  FILES
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

//      LOGS
app.use(morgan("dev"));

//        USE ROUTES
app.use(UserRoutes);
app.use(AdminRoutes);
app.use(PieceRoutes);
app.use(BilletRoutes);
app.use(PeriodeRoutes);
app.use(OuvrageRoutes);
app.use(CommandRoutes);

//  //  //     ERRORS SHOULD ALWAYS BE AFTER EVERYTHING
app.use((req, res) => {
  res.status(404).send({
    error: {
      message: "Undefied Route",
      code: "404",
    },
  });
});

module.exports = { log, config };
