const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendor.controller");
const auth = require("../middleware/auth");
const vendorValidator = require("../validator/vendor.validation");

//product management
router.post(
  "/vendor-add-prod",
  auth,
  vendorValidator.validateProduct,
  vendorController.addProd
);
router.get("/vendor-view-prod", auth, vendorController.viewProd);
router.get("/vendor-view-all-prod", vendorController.viewAllProd);
router.put("/vendor-update-prod/:prodId", auth, vendorController.updateProd);
router.delete("/vendor-delete-prod/:prodId", auth, vendorController.deleteProd);
router.post("/view-products-ages",auth,vendorController.viewProdsByAge);
//Attributes
router.post(
  "/vendor-attributes/add",
  auth,
  vendorValidator.validateAttribute,
  vendorController.addAttribute
);
router.get("/vendor-attributes", auth, vendorController.viewAllAtri);
router.put("/vendor-attributes/:id", auth, vendorController.upAttri);
router.delete("/vendor-attributes/:id", auth, vendorController.delAttri);

//brandReq
router.post("/vendor-brand-req", auth, vendorController.addReqBrand);
router.get("/vendor-brand-req",auth, vendorController.getReqBrand);
router.put("/vendor-brand-req/:id",auth,vendorController.upReqBrand);
router.delete("/vendor-brand-req/:id",auth,vendorController.delReqBrand);
router.get("/vendor-brand",auth,vendorController.viewAcceptBrands);
router.get("/vendor-view-brand",auth,vendorController.viewAcceptBrands);
//catReq
router.post("/vendor-cat-req", auth, vendorController.addReqCat);
router.get("/vendor-cat-req",auth, vendorController.getReqCat);
router.put("/vendor-cat-req/:id",auth,vendorController.upReqCat);
router.delete("/vendor-cat-req/:id",auth,vendorController.delReqCat);
router.get("/vendor-cat",auth,vendorController.findStatusAccCat);
router.get("/vendor-view-cat",auth,vendorController.findStatusAccCat);

//store
router.post("/vendor-store", auth, vendorController.saveStore);
router.put("/vendor-store/:id", auth, vendorController.upStore);
router.get("/vendor-store", auth, vendorController.gatStore);
//withdrawal
router.post(
  "/vendor-withdrawal",
  auth,
  vendorValidator.validateWithdrawal,
  vendorController.saveAccount
);
router.put("/vendor-withdrawal/:id", auth,vendorValidator.validateWithdrawal, vendorController.upAccount);
router.delete("/vendor-withdrawal/:id", auth, vendorController.delAccount);
router.get("/vendor-withdrawal", auth, vendorController.viewAllAccounts);
router.get("/vendor-withdrawal-each/:id", auth, vendorController.viewAccount);

//vendor profile
router.get("/vendor-profile",auth, vendorController.getVendorProfile);

//Tracking
router.post('/generate-awb', vendorController.generateAwb);
router.get('/viewpaidorders', auth, vendorController.viewPaidOrdersByVendor);


router.put('/update-status/:confirmOrderId', auth,vendorController. updateOrderStatus);
router.put('/addAwbToOrder', auth, vendorController.addAwbToConfirmOrder);

module.exports = router;
 