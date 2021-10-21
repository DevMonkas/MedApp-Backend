const shortid = require("shortid");
const cors = require("cors");
const crypto = require("crypto");
var Razorpay = require("razorpay");
const user = require("../models/user.js");
const wallet = require("../models/wallet.js");

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = class WalletService {
  static async createOrder(data) {
    const amount = data.body.amount;
    const currency = "INR";
    const dataJSON = {
      phoneNumber: data.phoneNumber.replace("+91", ""),
    };
    const options = {
      amount: (amount * 100).toString(),
      currency: currency,
      receipt: shortid.generate(),
      notes: dataJSON,
    };
    const response = await instance.orders.create(options);
    console.log(response);
    return {
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    };
  }
  static async razorpayWebhook(headerData, data) {
    const SECRET = process.env.SECRET_KEY_FOR_RAZORPAY_WEBHOOK;
    console.log("Response from webhook", data);
    const shasum = crypto.createHmac("sha256", SECRET);
    shasum.update(JSON.stringify(data));
    const digest = shasum.digest("hex");
    console.log(digest, headerData["x-razorpay-signature"]);
    if (digest === headerData["x-razorpay-signature"]) {
      console.log("Payment is legit.");
      const updation = await user.updateOne(
        { phone: data.payload.payment.entity.notes.phoneNumber },
        { $inc: { money: data.payload.payment.entity.amount / 100 } }
      );
      console.log(updation);
    }
    const dataJSON = {
      phoneNumber: data.payload.payment.entity.notes.phoneNumber,
      address_ID: data.payload.payment.entity.notes.addressID,
      supplierID: data.payload.payment.entity.notes.supplierID,
      razorPayOrderID: data.payload.payment.entity.notes.order_id,
      razorPayPaymentID: data.payload.payment.entity.notes.id,
    };
    return { status: "ok" };
  }
  static async getWalletMoney(req) {
    const response = await user.findOne(
      {
        phone: req.phoneNumber.replace("+91", ""),
      },
      {
        money: 1,
      }
    );
    return {
      money: response.money ? response.money : 0,
    };
  }
};
