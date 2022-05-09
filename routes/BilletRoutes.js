const express = require("express");
const authAdmin = require("../middleware/authAdmin");

const getBillet = require("../services/billetService/getBillet");
const getBillets = require("../services/billetService/getBillets");
const addBillet = require("../services/billetService/addBillet");
const updateBillet = require("../services/billetService/updateBillet");
const deleteBillet = require("../services/billetService/deleteBillet");

// INITIALIZE ROUTER
const BilletRoutes = express.Router();
/* 
  GET BilletS
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
BilletRoutes.get("/billets", (req, res) => {
  getBillets(req, res);
});
/* 
  GET Billets BY PERIOD
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
BilletRoutes.get("/periodes/:id/billets", (req, res) => {
  const id = req.params.id;
  getBillets(req, res, { periode: id });
});
/* 
 GET Billet BY ID
 JSON
 AUTHENTIFICATION NEEDED
 */
BilletRoutes.get("/billets/:id", (req, res) => {
  getBillet(req, res);
});
/* 
 ADD Billet
 FORM-DATA
 */
BilletRoutes.post("/billets", authAdmin, async (req, res) => {
  addBillet(req, res);
});
/* 
 UPDATE Billet
 FORM-DATA
 */
BilletRoutes.put("/billets/:id", authAdmin, async (req, res) => {
  updateBillet(req, res);
});
/* 
 DELETE Billet
 JSON
 */
BilletRoutes.delete("/billets/:id", authAdmin, (req, res) => {
  deleteBillet(req, res);
});

module.exports = BilletRoutes;
