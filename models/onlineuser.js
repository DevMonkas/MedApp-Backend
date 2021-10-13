const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlineUserSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
  },
  {
    collection: "onlineusers",
  }
);

module.exports = OnlineUser = mongoose.model("onlineusers", onlineUserSchema);
