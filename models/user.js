const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: "",
    },

    email: {
      type: String,
      required: false,
      default: "",
    },
    money: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    gender: {
      type: String,
      required: false,
    },
    address: {
      type: String,
    },
    dob: {
      type: String,
    },
  },
  {
    collection: "users",
  }
);

module.exports = User = mongoose.model("users", userSchema);
