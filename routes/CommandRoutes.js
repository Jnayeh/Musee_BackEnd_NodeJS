const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const addCommand = require("../services/commandService/addCommand");
const getCommands = require("../services/commandService/getCommands");
const validateCommand = require("../services/commandService/validateCommand");

// INITIALIZE ROUTER
const CommandRoutes = express.Router();
/* 
  GET COMMANDS
 */
CommandRoutes.get("/commands", (req, res) => {
  getCommands(req, res, {});
});

/* 
 ADD COMMAND
 */
CommandRoutes.post("/commands", auth, async (req, res) => {
  addCommand(req, res);
});

/* 
 UPDATE COMMAND
 */
CommandRoutes.patch("/commands/:id", async (req, res) => {
  validateCommand(req, res);
});

module.exports = CommandRoutes;
