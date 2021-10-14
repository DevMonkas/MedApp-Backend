const admin = require("firebase-admin");
const user = require("../models/user.js");
const wallet = require("../models/wallet");
const { options } = require("../routes/userRoute.js");

const PRIVATEKEY = process.env.PRIVATEKEY;
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECTID,
  private_key_id: process.env.PROJECTKEYID,
  private_key: PRIVATEKEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENTEMAIL,
  client_id: process.env.CLIENTID,
  auth_uri: process.env.AUTHURI,
  token_uri: process.env.TOKENURI,
  auth_provider_x509_cert_url: process.env.AUTHPROVIDERX509CERTURL,
  client_x509_cert_url: process.env.CLIENTX509CERTURL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = class UserService {
  static async checkIDToken(IDToken) {
    const token = IDToken.authorization;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        let userDetails = await user.findOne({
          phone: decodedToken.phone_number.replace("+91", ""),
        });
        if (!userDetails) {
          user.create(
            { phone: decodedToken.phone_number.replace("+91", "") },
            (err, docs) => {
              if (err) throw err;
              wallet.create({ user_id: docs.id }, (err, docs) => {
                if (err) throw err;
              });
            }
          );
          return { userExists: false };
        }
        return userDetails;
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateUserDetails(userDetails) {
    try {
      let res = await user.updateOne(
        { phone: userDetails.phoneNumber.replace("+91", "") },
        {
          ...userDetails.body,
        },
        {}
      );
      return { success: res.n > 0 };
    } catch (err) {
      throw err;
    }
  }
  static async getUserDetails(phoneNumber) {
    try {
      let res = await user.findOne({ phone: phoneNumber });
      console.log(res);
      return res;
    } catch (err) {
      throw err;
    }
  }
};
