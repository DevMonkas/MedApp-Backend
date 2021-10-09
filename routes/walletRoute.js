const express = require("express");
const router = express.Router();
const WalletCtrl = require("../controllers/walletController");
const tokenVerify = require("../middleware/tokenVerify.middleware.js");

router.post("/createPaymentOrder", tokenVerify, WalletCtrl.apiCreateOrder);

router.post(
  "/razorpayWebhook", //tokenVerify,
  WalletCtrl.apiRazorpayWebhook
);

router.get("/getWalletMoney", tokenVerify, WalletCtrl.apiGetWalletMoney);

module.exports = router;
