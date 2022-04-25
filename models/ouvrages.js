const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ouvrageSchema = new Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: false,
    default: null,
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
});

const Ouvrage = mongoose.model("Ouvrage", ouvrageSchema);
module.exports = Ouvrage;
