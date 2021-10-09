const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const astrologerSchema = Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },

  email: {
    type: String,
    required: true,
    default: "",
  },

  phone: {
    type: String,
    required: true,
    default: "",
  },

  fields: {
    type: [String],
  },

  languages_known: {
    type: [String],
  },

  experience: {
    type: Number,
    default: 0
  },

  rate: {
    type: Number,
  },

  address: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Astrologer = mongoose.model("Astrologer", astrologerSchema);
