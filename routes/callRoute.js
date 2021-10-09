const express = require("express");
const router = express.Router();
const CallCtrl = require("../controllers/callController");


router.use('/callAstrologer', CallCtrl.apiCallTheAstrologer);

module.exports = router;
