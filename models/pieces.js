const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pieceSchema = new Schema({
  libele: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  front_image: {
    type: String,
    required: false,
  },
  back_image: {
    type: String,
    required: false,
  },
  a_vendre: {
    type: Boolean,
    required: true,
    default: false,
  },
  available: {
    type: Boolean,
    required: true,
    default: false,
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
  //One periode reference
  periode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Periode",
  },
});

const Piece = mongoose.model("Piece", pieceSchema);
module.exports = Piece;
