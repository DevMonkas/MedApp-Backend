const CallService = require('../services/callService');


module.exports = class Call {
    static async apiCallTheAstrologer(req, res, next) {
      try {
        const dataJSON = {
          phone: {
          to: req.body.phone
          }
        }
        const callStatus = await CallService.callAstrologer(dataJSON);
        if (!callStatus) {
          res.status(404).json("Call couldn't be established!");
        }
        res.json(callStatus);
      } catch (error) {
        res.status(501).json({ error: error.message });
      }
    }
}