const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const phoneNumber = decodedToken.phone_number;
    req.phoneNumber = phoneNumber.replace("+91", "");
    if (!decodedToken) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
};
