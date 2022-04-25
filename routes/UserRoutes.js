const express = require("express");
const auth = require("../middleware/auth");
const getOne = require("../services/userService/getUser");
const getUsers = require("../services/userService/getUsers");
const addUser = require("../services/userService/addUser");
const loginUser = require("../services/userService/loginUser");
const updateUser = require("../services/userService/updateUser");
const changeMdp = require("../services/userService/changeMdp");
const deleteUser = require("../services/userService/deleteUser");

// INITIALIZE ROUTER
const router = express.Router();

//  GET USERS
// JSON
// AUTHENTIFICATION NEEDED

router.get("/users", auth, (req, res) => {
  getUsers(req, res, "user");
});

// GET USER BY ID
// JSON
// AUTHENTIFICATION NEEDED

router.get("/users/:id", auth, (req, res) => {
  getOne(req, res, "user");
});

// LOGIN USER
// JSON
// AUTHENTIFICATION NOT NEEDED

router.post("/loginUser", (req, res) => {
  loginUser(req, res, "user");
});

// REGISTER USER
// JSON

router.post("/users/", (req, res) => {
  addUser(req, res, "user");
});

// UPDATE USER
// FORM-DATA

router.put("/users/:id", auth, async (req, res) => {
  updateUser(req, res, "user", "./user_photos/");
});

// CHANGE PASSWORD
// JSON

router.patch("/users/:id", auth, async (req, res) => {
  changeMdp(req, res, "user");
});

// DELETE USER
// JSON

router.delete("/users/:id", auth, (req, res) => {
  deleteUser(req, res, "user", "./user_photos/");
});

module.exports = router;
