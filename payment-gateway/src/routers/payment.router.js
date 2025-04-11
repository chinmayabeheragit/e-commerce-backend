const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth");
const paymentValidator = require("../validators/payment.validator");
router.post('/create-check-out-session',auth,paymentValidator.validateCreateASession, paymentController.createCheckOutSession);
router.post('/operation-inquiry',paymentController.operationInquiry);
module.exports = router;
