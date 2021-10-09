const express = require("express");
const router = express.Router();
const CallCtrl = require("../controllers/callController");

router.use("/callDoctor", CallCtrl.apiCallTheDoctor);

module.exports = router;
