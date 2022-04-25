const express = require("express");
const authAdmin = require("../middleware/authAdmin");
const addPeriode = require("../services/periodeService/addPeriod");
const deletePeriode = require("../services/periodeService/deletePeriod");
const getPeriode = require("../services/periodeService/getPeriod");
const getPeriodes = require("../services/periodeService/getPeriods");
const updatePeriode = require("../services/periodeService/updatePeriod");

// INITIALIZE PeriodeRoutes
const PeriodeRoutes = express.Router();
/* 
  GET PERIODES
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
PeriodeRoutes.get("/periodes", (req, res) => {
  getPeriodes(req, res, {});
});

/* 
  GET PIECE PERIODES
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
PeriodeRoutes.get("/periodes/piece", (req, res) => {
  getPeriodes(req, res, { piece: true });
});

/* 
  GET BILLET PERIODES
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
PeriodeRoutes.get("/periodes/billet", (req, res) => {
  getPeriodes(req, res, { piece: false });
});
/* 
 GET PERIODES BY ID
 JSON
 AUTHENTIFICATION NEEDED
 */
PeriodeRoutes.get("/periodes/:id", (req, res) => {
  getPeriode(req, res);
});
/* 
 ADD PERIODES
 JSON
 */
PeriodeRoutes.post("/periodes", async (req, res) => {
  addPeriode(req, res);
});
/* 
 UPDATE PERIODES
 JSON
 */
PeriodeRoutes.put("/periodes/:id", async (req, res) => {
  updatePeriode(req, res);
});
/* 
 DELETE PERIODES
 JSON
 */
PeriodeRoutes.delete("/periodes/:id", (req, res) => {
  deletePeriode(req, res);
});

module.exports = PeriodeRoutes;
