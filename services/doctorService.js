const Doctor = require("../models/doctor");
const admin = require("firebase-admin");
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

module.exports = class DoctorService {
  static async getAllDoctors() {
    const allDoctors = await Doctor.find();
    return allDoctors;
  }

  static async createDoctor(data) {
    // const newDoctor = {
    //   // title: data.title,
    //   // body: data.body,
    //   // article_image: data.article_image,
    //   name: data.name,
    //   gender: data.gender,
    //   phone: data.phone,
    //   pincode: data.pincode
    // };
    const response = await new Doctor(data).save();
    return response;
  }

  static async getDoctorbyPhone(phoneNumber) {
    const singleDoctorResponse = await Doctor.findOne({
      phone: phoneNumber,
    });
    return singleDoctorResponse;
  }

  static async updateDoctor(body) {
    // const updates = JSON.parse(body)
    const updates = {};
    for (var attributename in body) {
      // console.log(attributename+": "+body[attributename]);
      updates[attributename] = body[attributename];
    }
    const doctor = await Doctor.findOneAndUpdate({ _id: body._id }, updates, {
      new: true,
    });
    return doctor;
  }

  static async deleteDoctor(articleId) {
    const deletedResponse = await Doctor.findOneAndDelete(articleId);
    return deletedResponse;
  }
};
