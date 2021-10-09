const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/userController.js");
const tokenVerify = require("../middleware/tokenVerify.middleware.js");

/**
 * @openapi
 * /users/checkAuth:
 *   post:
 *     summary: To check user's auth.
 *     requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   authorization:
 *                      type: string
 *                      description: Authorization token
 *                      example: sdfsdfpoiuewoiruwoeiru98435ui3hj4ntgf89hejnuitjntgie347uthgnhuikgrh897dh
 *
 *     responses:
 *       200:
 *         description: Check AuthToken of a user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userExists:
 *                          type: boolean
 *                          example: true
 */
router.post("/checkAuth", UserCtrl.apiCheckIDToken);

/**
 * @openapi
 * /users/updateUser:
 *   post:
 *     summary: Update User Details
 *     parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *     requestBody:
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   name:
 *                      type: string
 *                      example: Vijay
 *                   email:
 *                      type: string
 *                      example: vijay@gmail.com
 *                   gender:
 *                      type: string
 *                      example: Male/Female
 *                   address:
 *                      type: string
 *                      example: Flat,Street,City,Pincode
 *     responses:
 *       200:
 *         description: Update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: boolean
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
router.post("/updateUser", tokenVerify, UserCtrl.updateUserDetails);

/**
 * @openapi
 * /users/getUserDetails:
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
 *         description: Update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   name:
 *                      type: string
 *                      example: Vijay
 *                   email:
 *                      type: string
 *                      example: vijay@gmail.com
 *                   gender:
 *                      type: string
 *                      example: Male/Female
 *                   address:
 *                      type: string
 *                      example: Flat,Street,City,Pincode
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
router.get("/getUserDetails", tokenVerify, UserCtrl.getUserDetails);

module.exports = router;
