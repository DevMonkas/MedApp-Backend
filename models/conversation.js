const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var message = require("./message");
const conversationSchema = new Schema(
  {
    userPhone: {
      type: String,
      required: true,
      default: "",
    },
    doctorPhone: {
      type: String,
      required: true,
      default: "",
    },
    status: {
      type: Boolean,
      required: true,
    },
    messages: [message],
  },
  {
    collection: "conversation",
  }
);

module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
