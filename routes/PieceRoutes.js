const express = require("express");
const authAdmin = require("../middleware/auth");

const updatePiece = require("../services/pieceService/updatePiece");
const getPiece = require("../services/pieceService/getPiece");
const getPieces = require("../services/pieceService/getPieces");
const deletePiece = require("../services/pieceService/deletePiece");
const addPiece = require("../services/pieceService/addPiece");

// INITIALIZE ROUTER
const router = express.Router();
/* 
  GET PIECES
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
router.get("/pieces", (req, res) => {
  getPieces(req, res, {});
});
/* 
  GET PIECES BY PERIOD
 JSON
 AUTHENTIFICATION NOT NEEDED
 */
router.get("/periodes/:id/pieces", (req, res) => {
  const id = req.params.id;
  getPieces(req, res, { periode: id });
});
/* 
 GET PIECE BY ID
 JSON
 AUTHENTIFICATION NEEDED
 */
router.get("/pieces/:id", (req, res) => {
  getPiece(req, res);
});
/* 
 ADD PIECE
 FORM-DATA
 */
router.post("/pieces", authAdmin, async (req, res) => {
  addPiece(req, res);
});
/* 
 UPDATE PIECE
 FORM-DATA
 */
router.put("/pieces/:id", authAdmin, async (req, res) => {
  updatePiece(req, res);
});
/* 
 DELETE PIECE
 JSON
 */
router.delete("/pieces/:id", authAdmin, (req, res) => {
  deletePiece(req, res);
});

module.exports = router;
