const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billetSchema = new Schema({
  libele: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  stock: {
    type: Number,
    required: false,
    default: null,
  },
  prix: {
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
    required: true,
  },
});

const Billet = mongoose.model("Billet", billetSchema);
module.exports = Billet;
