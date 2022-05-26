const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commandSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  validated: {
    type: Boolean,
    default: false,
    required: true,
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  adresse: {
    type: String,
    required: false,
  },
  panier: {
    type: Object,
    required: true,
  },
  //One periode reference
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Command = mongoose.model("Command", commandSchema);
module.exports = Command;
