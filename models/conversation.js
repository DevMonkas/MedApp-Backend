const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var message = require("./message");
const conversationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    doctorId: {
      type: String,
      required: true,
      unique: true,
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
