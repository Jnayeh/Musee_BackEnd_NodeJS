const express = require("express");

const Admin = require("../models/users");
const authAdmin = require("../middleware/authAdmin");
const addAdmin = require("../services/userService/addUser");
const loginAdmin = require("../services/userService/loginUser");
const updateAdmin = require("../services/userService/updateUser");
const changeMdp = require("../services/userService/changeMdp");
const deleteAdmin = require("../services/userService/deleteUser");
const getAdmins = require("../services/userService/getUsers");
const getAdmin = require("../services/userService/getUser");

// INITIALIZE ROUTER
const router = express.Router();
/* 
 GET ADMINS
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
router.get("/admins", authAdmin, (req, res) => {
  getAdmins(req, res, "administrateur");
});
/* 
 GET ADMIN BY ID
 JSON
 AUTHENTIFICATION NEEDED
 */
router.get("/admins/:id", authAdmin, (req, res) => {
  getAdmin(req, res, "administrateur");
});
/* 
 LOGIN ADMIN
 JSON
 */
router.post("/" + process.env.admin_route + "/loginAdmin", async (req, res) => {
  loginAdmin(req, res, "administrateur");
});
/* 
 ADD ADMIN
 JSON
 */
router.post("/" + process.env.add_admin + "/admins/", async (req, res) => {
  addAdmin(req, res, "administrateur");
});
/* 
 UPDATE ADMIN
 FORM-DATA
 */
router.put("/admins/:id", authAdmin, async (req, res) => {
  updateAdmin(req, res, "administrateur", "./admin_photos/");
});
/* 
 CHANGE PASSWORD
 JSON
 */
router.patch("/admins/:id", authAdmin, async (req, res) => {
  changeMdp(req, res, "administrateur");
});
/* 
 DELETE ADMIN
 JSON
 */
router.delete("/admins/:id", authAdmin, (req, res) => {
  deleteAdmin(req, res, "administrateur", "./admin_photos/");
});

module.exports = router;
