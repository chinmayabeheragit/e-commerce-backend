const express = require("express");
const router = express.Router();
const Admincontoller = require("../controllers/admin.controller");
const adminValidator = require("../validators/validator");
const auth = require("../middleware/auth")
//banner management
router.post('/banners/add', auth, adminValidator.validateBanner, Admincontoller.addBanner);
router.get('/banners',auth , Admincontoller.listBanners);
router.put('/banners/edit/:bannerId',auth,  Admincontoller.editBanner);
router.delete('/banners/delete/:bannerId', auth ,Admincontoller.deleteBanner);
//category management
router.post("/addcategory", auth,adminValidator.validateCategory,Admincontoller.addCategory);
router.get("/viewcategory",auth, Admincontoller.viewCategories);
router.get("/viewcategory_by-id/:categoryId",auth, Admincontoller.viewCategory_categoryId);
router.put("/category/edit/:categoryId",auth,adminValidator.validateCategory, Admincontoller.editCategory);
router.delete("/category/delete/:categoryId",auth, Admincontoller.deleteCategory);
router.get("/category",auth, Admincontoller.findStatusAccCat);
router.get("/category-vendor-req", auth, Admincontoller.viewReqCatByVendor);
router.put("/category/:id",auth, Admincontoller.upCatStatus);
// vendor mangement
router.post('/vendors/add',auth,adminValidator.validateVendor, Admincontoller.addVendor);
router.get('/get-req-vendor',auth,Admincontoller.viewRequestedVendor);
router.post('/vendor-approve',auth,Admincontoller.vendorApproved);
router.post('/make-vendor-inactive',auth, Admincontoller.makeVendorInactive);
router.post('/make-vendor-active', auth, Admincontoller.makeVendorActive);
router.get('/view-vendor/:status',auth, Admincontoller.viewVendorByStatus);
//brand management
router.post('/createBrand', auth,Admincontoller.addbrand);
router.get('/getallBrand',auth, Admincontoller.viewbrand);
router.get('/viewRequestedBrand',auth, Admincontoller.viewRequestedBrand);
router.put('/updateBrand/:brandId', auth,Admincontoller.updatebrand);
router.put('/updateBrandStatus/:id', auth,Admincontoller.upBrandStatus);
router.delete('/deleteBrand/:brandId',auth, Admincontoller.deletebrand)
router.get('/getBrand/:brandId',auth, Admincontoller.getbrandById)
//coupon management
router.post('/savecoupon',auth,adminValidator.validateCoupon,Admincontoller.Couponsaveorder);
router.get('/getallcoupon',auth, Admincontoller.couponview);
router.get('/getcouponbyid/:couponId',auth, Admincontoller.CoupongetById);
router.get('/getvoucherid/:voucherCode',auth, Admincontoller.getCouponByVoucherCode);
router.put('/updatecoupon/:couponId',auth, Admincontoller.updateCoupon);
router.delete('/Deletecoupon/:couponId',auth, Admincontoller.deleteCoupon);
//customer management 
router.post('/savecustomer',auth, adminValidator.validateCustomer, Admincontoller.Customersaveorder);
router.get('/getallcustomer', auth,Admincontoller.customerview);
router.get('/getbycustomername/:customername', auth,Admincontoller.CustomergetByName);
router.get('/getbycustomerid/:customerId',auth, Admincontoller.CustomergetById);
router.put('/updatecustomerid/:customerId',auth, Admincontoller.CustomerupdateById);
router.delete('/deletecustomerid/:customerId',auth, Admincontoller.CustomerdeleteById);
router.get('/Custompagination',auth, Admincontoller.paginateAll);
//transaction management
router.post('/createTransaction',auth ,adminValidator.validateTransaction, Admincontoller.addtransaction);
router.get('/getTransaction/:transactionId',auth, Admincontoller.getBytransactionId);
router.get('/getalltrans',auth, Admincontoller.viewtransaction);
router.get('/getPagination',auth, Admincontoller.viewtransactionall)
router.post('/createpin',auth, Admincontoller.addPin);
router.get('/getpin/:pincode',auth, Admincontoller.viewPin);
//view all products
router.get('/getAllProds',auth, Admincontoller.viewProd);

// //Order Maagement
router.get('/viewallorders',Admincontoller.viewallorders);
router.put('/updateorderstatus',auth,Admincontoller.updateorderstatus);
router.put('/updatepaidstatus/:confirmOrderId', Admincontoller.updatepaidstatus);
router.get('/viewpaidorders', Admincontoller.viewPaidOrders);

//unused APIs
router.get('/vendors', auth,Admincontoller.listVendors);
router.get("/inactive-vendors",auth,Admincontoller.viewInactiveVendor);
router.put('/vendors/edit/:vendorId',auth,adminValidator.validateVendor, Admincontoller.editVendor);
router.delete('/vendors/delete/:vendorId',auth, Admincontoller.deleteVendor);


module.exports = router;
