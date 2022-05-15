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
});

const Periode = mongoose.model("Periode", periodeSchema);
module.exports = Periode;
