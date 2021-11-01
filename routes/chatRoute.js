const express = require("express");
const router = express.Router();
const ChatCtrl = require("../controllers/chatController");
const tokenVerify = require("../middleware/tokenVerify.middleware");

router.use("/chatDoctor", ChatCtrl.apiChatWithDoctor);

/**
 * @openapi
 * /chat/getChatsWithDoctor:
 *   get:
 *     summary: To get user details
 *     parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *
 *     responses:
 *       200:
 *         description: Get Chat with particular doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   userId:
 *                      type: string
 *                      example: 9647384950
 *                   doctorId:
 *                      type: string
 *                      example: 8452475839
 *       500:
 *         description: Update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something is wrong
 *
 *
 */
router.get("/getChatsWithDoctor", ChatCtrl.getChatWithDoctor);

/**
 * @openapi
 * /chat/getAllConsultations:
 *   get:
 *     summary: Get All consultations with doctor
 *     parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *
 *     responses:
 *       200:
 *         description: Get All consultations with doctor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   userId:
 *                      type: string
 *                      example: 9647384950
 *       500:
 *         description: Update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something is wrong
 *
 *
 */
router.get("/getAllConsultations", tokenVerify, ChatCtrl.getAllConsultations);

router.get(
  "/getAllConsultationsForDoctor",
  tokenVerify,
  ChatCtrl.getAllConsultationsForDoctor
);

module.exports = router;
