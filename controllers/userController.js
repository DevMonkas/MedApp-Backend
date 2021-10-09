const user = require("../models/user.js");
const UserService = require("../services/userService.js");

module.exports = class Users {
  static async apiCheckIDToken(req, res, next) {
    try {
      const decodedToken = await UserService.checkIDToken(req.body);
      res.json(decodedToken);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUserDetails(req, res, next) {
    try {
      const response = await UserService.updateUserDetails(req);
      res.json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async getUserDetails(req, res, next) {
    try {
      const response = await UserService.getUserDetails(req.phoneNumber);
      res.json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
