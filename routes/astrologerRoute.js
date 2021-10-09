const express = require("express");
const router = express.Router();
const AstrologerCtrl = require("../controllers/astrologerController");


router.get("/getAllAstrologers", AstrologerCtrl.apiGetAllAstrologers);


module.exports = router;