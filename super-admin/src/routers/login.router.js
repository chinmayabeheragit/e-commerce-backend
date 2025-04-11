const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

router.post("/add-admin", loginController.addAdmin);
router.post("/add-vendor", loginController.addVendor);
router.post("/login",loginController.login); 
module.exports = router;