const express = require("express");
const router = express.Router();
const DoctorCtrl = require("../controllers/doctorController");

router.get("/getAllDoctors", DoctorCtrl.apiGetAllDoctors);

module.exports = router;
