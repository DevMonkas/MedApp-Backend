const Astrologer = require("../models/astrologer");
const admin = require("firebase-admin");
const PRIVATEKEY =
  process.env.PRIVATEKEY1 +
  process.env.PRIVATEKEY2 +
  process.env.PRIVATEKEY3 +
  process.env.PRIVATEKEY4 +
  process.env.PRIVATEKEY5 +
  process.env.PRIVATEKEY6 +
  process.env.PRIVATEKEY7 +
  process.env.PRIVATEKEY8;
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

module.exports = class AstrologerService {
  static async getAllAstrologers() {
    const allAstrologers = await Astrologer.find();
    return allAstrologers;
  }

  static async createAstrologer(data) {
    const newAstrologer = {
      title: data.title,
      body: data.body,
      article_image: data.article_image,
    };
    const response = await new Astrologer(newAstrologer).save();
    return response;
  }

  static async getAstrologerbyId(articleId) {
    const singleAstrologerResponse = await Astrologer.findById({
      _id: articleId,
    });
    return singleAstrologerResponse;
  }

  static async updateAstrologer(title, body, articleImage) {
    const updateResponse = await Astrologer.updateOne(
      { title, body, articleImage },
      { $set: { date: new Date.now() } }
    );
    return updateResponse;
  }

  static async deleteAstrologer(articleId) {
    const deletedResponse = await Astrologer.findOneAndDelete(articleId);
    return deletedResponse;
  }
};
