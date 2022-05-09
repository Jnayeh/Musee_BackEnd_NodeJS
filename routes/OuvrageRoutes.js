const express = require("express");
const authAdmin = require("../middleware/authAdmin");

const getOuvrage = require("../services/ouvrageService/getOuvrage");
const getOuvrages = require("../services/ouvrageService/getOuvrages");
const addOuvrage = require("../services/ouvrageService/addOuvrage");
const updateOuvrage = require("../services/ouvrageService/updateOuvrage");
const deleteOuvrage = require("../services/ouvrageService/deleteOuvrage");

// INITIALIZE ROUTER
const OuvrageRoutes = express.Router();
/* 
  GET ouvrages
  JSON
  AUTHENTIFICATION NOT NEEDED
 */
OuvrageRoutes.get("/ouvrages", (req, res) => {
  getOuvrages(req, res, {});
});
/* 
  GET Ouvrage BY ID
  JSON
  AUTHENTIFICATION NEEDED
 */
OuvrageRoutes.get("/ouvrages/:id", (req, res) => {
  getOuvrage(req, res);
});
/* 
  ADD Ouvrage
  FORM-DATA
 */
OuvrageRoutes.post("/ouvrages", authAdmin, async (req, res) => {
  addOuvrage(req, res);
});
/* 
  UPDATE Ouvrage
  FORM-DATA
 */
OuvrageRoutes.put("/ouvrages/:id", authAdmin, async (req, res) => {
  updateOuvrage(req, res);
});
/* 
  DELETE Ouvrage
  JSON
 */
OuvrageRoutes.delete("/ouvrages/:id", authAdmin, (req, res) => {
  deleteOuvrage(req, res);
});

module.exports = OuvrageRoutes;
