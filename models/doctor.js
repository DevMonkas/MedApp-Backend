const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  gender: { type: String, required: true },

  phone: {
    type: String,
    required: true,
    default: "",
    unique: true,
  },
  money: {
    type: Number,
    default: 0,
  },
  expertise: {
    type: [String],
  },

  languages_known: {
    type: [String],
  },

  experience: {
    type: Number,
    default: 0,
  },

  rate: {
    type: Number,
  },

  address: {
    type: String,
  },
  pincode: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  image: { type: String },
});

module.exports = Doctor = mongoose.model("doctors", doctorSchema);
