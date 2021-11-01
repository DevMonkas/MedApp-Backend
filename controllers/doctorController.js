const DoctorService = require("../services/doctorService");

module.exports = class Doctor {
  static async apiGetAllDoctors(req, res, next) {
    try {
      const articles = await DoctorService.getAllDoctors();
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }
      res.json(articles);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }

  static async apiGetDoctorByPhone(req, res, next) {
    try {
      let phone = req.query.phone || {};
      const article = await DoctorService.getDoctorbyPhone(phone);
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiCreateDoctor(req, res, next) {
    try {
      //console.log(req.body)
      const createdDoctor = await DoctorService.createDoctor(req.body);
      res.json(createdDoctor);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiUpdateDoctor(req, res, next) {
    try {
      //   for(var attributename in req.body){
      //     console.log(attributename+": "+req.body[attributename]);
      // }

      const updatedDoctor = await DoctorService.updateDoctor(req.body);
      if (updatedDoctor.modifiedCount === 0) {
        throw new Error("Unable to update article, error occord");
      }

      res.json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDeleteDoctor(req, res, next) {
    try {
      const articleId = req.params.id;
      const deleteResponse = await DoctorService.deleteDoctor(articleId);
      res.json(deleteResponse);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async apiCheckDoctorAuth(req, res, next) {
    try {
      const doctor = await DoctorService.getDoctorbyPhone(req.body.phoneNumber);
      if (!doctor) {
        res.json({ userExists: false });
      } else {
        res.json({ userExists: true });
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};
