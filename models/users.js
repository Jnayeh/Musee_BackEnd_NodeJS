const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
      unique: true,
    },
    num_tel: {
      type: Number,
      required: false,
    },
    mot_de_passe: {
      type: String,
      required: true,
      select: false,
    },
    photo: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
