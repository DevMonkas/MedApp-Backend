const WalletService = require("../services/walletService.js");

module.exports = class Wallet {
  static async apiCreateOrder(req, res, next) {
    try {
      const response = await WalletService.createOrder(req);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async apiRazorpayWebhook(req, res, next) {
    try {
      const response = await WalletService.razorpayWebhook(
        req.headers,
        req.body
        // req.phoneNumber
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //getWalletMoney
  static async apiGetWalletMoney(req, res, next) {
    try {
      const response = await WalletService.getWalletMoney(req);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
