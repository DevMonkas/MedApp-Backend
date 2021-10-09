const AstrologerService = require("../services/astrologerService");

module.exports = class Astrologer {
  static async apiGetAllAstrologers(req, res, next) {
    try {
      const articles = await AstrologerService.getAllAstrologers();
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }
      res.json(articles);
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }

  static async apiGetAstrologerById(req, res, next) {
    try {
      let id = req.params.id || {};
      const article = await AstrologerService.getAstrologerbyId(id);
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiCreateAstrologer(req, res, next) {
    try {
      const createdAstrologer = await AstrologerService.createAstrologer(req.body);
      res.json(createdAstrologer);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiUpdateAstrologer(req, res, next) {
    try {
      const comment = {};
      comment.title = req.body.title;
      comment.body = req.body.body;
      comment.articleImage = req.body.article_image;

      const updatedAstrologer = await AstrologerService.updateAstrologer(comment);

      if (updatedAstrologer.modifiedCount === 0) {
        throw new Error("Unable to update article, error occord");
      }

      res.json(updatedAstrologer);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiDeleteAstrologer(req, res, next) {
    try {
      const articleId = req.params.id;
      const deleteResponse = await AstrologerService.deleteAstrologer(articleId);
      res.json(deleteResponse);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
