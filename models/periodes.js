const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const periodeSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: false,
  },
  date_creation: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: "true",
  },
  piece: {
    type: Boolean,
    default: true,
    required: true,
  },
  //Many pieces reference
  pieces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Piece",
    },
  ],
  //Many billets reference
  billets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billet",
    },
  ],
});

const Periode = mongoose.model("Periode", periodeSchema);
module.exports = Periode;
