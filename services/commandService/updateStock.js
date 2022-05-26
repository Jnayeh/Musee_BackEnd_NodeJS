const Billet = require("../../models/billets.js");
const Piece = require("../../models/pieces.js");
const Ouvrage = require("../../models/ouvrages.js");
const updateStock = async (res, panier) => {
  panier.billets.forEach((element) => {
    Billet.findById(element._id)
      .then((result) => {
        let new_stock = Number(result.stock) - Number(element.quantite);
        return Billet.updateOne({ _id: element._id }, { stock: new_stock });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  panier.pieces.forEach((element) => {
    Piece.findById(element._id)
      .then((result) => {
        let new_stock = Number(result.stock) - Number(element.quantite);
        return Piece.updateOne({ _id: element._id }, { stock: new_stock });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  panier.ouvrages.forEach((element) => {
    Ouvrage.findById(element._id)
      .then((result) => {
        let new_stock = Number(result.stock) - Number(element.quantite);
        return Ouvrage.updateOne({ _id: element._id }, { stock: new_stock });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
module.exports = updateStock;
