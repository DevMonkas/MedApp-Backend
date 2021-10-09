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

  static async apiGetDoctorById(req, res, next) {
    try {
      let id = req.params.id || {};
      const article = await DoctorService.getDoctorbyId(id);
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiCreateDoctor(req, res, next) {
    try {
      const createdDoctor = await DoctorService.createDoctor(req.body);
      res.json(createdDoctor);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiUpdateDoctor(req, res, next) {
    try {
      const comment = {};
      comment.title = req.body.title;
      comment.body = req.body.body;
      comment.articleImage = req.body.article_image;

      const updatedDoctor = await DoctorService.updateDoctor(comment);

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
};
