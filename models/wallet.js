const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = Schema({
  user_id: {
    type: String,
    required: true,
    default: "",
  },

  money: {
    type: Number,
    required: true,
    default: 0.0,
  }
},
  {
    collection: "wallet",
  }
);

module.exports = Wallet = mongoose.model("wallet", walletSchema);
