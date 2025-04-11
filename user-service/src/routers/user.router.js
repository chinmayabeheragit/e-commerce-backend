const express = require("express");
const router = express.Router();
const UserController = require('../controllers/User.Controller')
const auth = require('../../src/middleware/auth');
const validator = require('../validator/user.validation');
const paymentValidator = require('../validator/payment.validator')

router.post('/cart/add',  auth,UserController.addToCart);
router.delete('/remove-cart-product/:id', auth, UserController.removeCartProduct);
router.get('/cart-products',auth, UserController.ViewCartProduct)
router.get('/total-price', UserController.ViewCartTotalPrice)
router.post('/wishlist/:itemId/move-to-cart',auth, UserController.moveItemToCart);
router.get('/product/:productId', UserController.viewProductDetailsById);

router.get('/wishlist/:userName',auth, UserController.viewWishlistByUserName);
router.delete('/wishlist/:itemId/remove', UserController.removeItemFromWishlist);
router.post('/wishlist/add', auth, UserController.addToWishlist);


router.put('/order/update-status/:id/:status',auth, UserController.updateOrderStatus);
router.get('/orders', auth,UserController.viewAllOrders);
router.get('/ongoing/:orderId', UserController.viewOngoingOrderByOrderId);
router.get('/orders/:orderId/share', UserController.shareOrderDetails)
router.get('/delivery-status/:orderId', UserController.viewOrderDeliveryStatus);

router.post('/login',validator.validateLogin, UserController.login);
router.post('/register', validator.validateRegister,UserController.register);
router.post('/forget-password', UserController.forgotPassword);
router.post('/password-reset/:token', UserController.PasswordReset);

router.get('/invoice/:invoiceId', UserController.getInvoiceBillById);

router.post('/addresses/add', auth,validator.validateAddAddress, UserController.addAddress);
router.put('/updateaddress/:addressId', UserController.editAddress);
router.get('/addresses',auth, UserController.viewAddresses);

router.post('/createprofile', auth,validator.validateProfile, UserController.createProfile);
router.put('/update/profile', auth, UserController.updateProfile);
router.put('/user/update/:profileId/:phoneNumber', auth, UserController.updatePhoneNumber);
router.put('/deactivate-account/:id/:status', auth, UserController.deactivateAccount);
router.get('/getUserProfile', auth, UserController.viewUserProfile);

router.get('/banners/:bannerId', UserController.viewBannerById);
router.get('/banners', UserController.viewAllBanner);
router.get('/products/category/:categoryId',UserController.viewProductsByCategory);
router.get('/categories', UserController.viewAllCategories);
router.get('/brands', UserController.viewAllBrands);
router.get('/shop/discount', UserController.shopByDiscount);
router.get('/stores/:storeId', UserController.viewStoreById);
router.get('/age-categories', UserController.viewAllAgeCategories);
router.get('/products/age-category/:ageCategoryId', UserController.viewProductsByAgeCategoryId)

router.post('/ratingreview/add/:productId', auth, UserController.addRatingReviewByProdId);
router.get('/ratingreview', UserController.getAllRatingReview);
router.get('/ratingreview/:productId', UserController.getRatingReviewsById);
router.put('/update/:id', UserController.updateRatingReview);
router.delete('/ratingReview/:id', UserController.deleteRatingReview);
router.get('/ratingAvg/:productId',UserController.viewAvgRatingOfProd);
router.get('/getAllProds',UserController.viewAllProduct);
router.post('/getAllProdsByCat',UserController.viewProdsByCat);
router.post('/getAllProdsBySubCat',UserController.viewProdsBySubCat);
router.post("/view-products-ages",UserController.viewProdsByAge);
router.post("/save-user",UserController.saveUser);
router.post("/login-user",UserController.loginUser);
router.put("/update-user/:id",auth,UserController.updateUser);


//tracking
router.post('/order/cartProductOrder', auth,validator.validatesCartProductOrder, UserController.cartProductOrder);
router.post('/order/singleProductOrder', auth,validator.validateSingleProductOrder, UserController.singleProductOrder);
router.get('/track-order/:awbNumber', UserController.trackOrder);
router.post("/pincode",validator.pincodeValidation, UserController.getAddress);
router.post('/forward-manifest',validator.validateManifest, UserController.createForwardShipment);
router.post('/ndr-data', auth,validator.validateNDRData, UserController.ndrData);
router.post('/shipment-cancellation', auth,validator.validateShipmentCancellation, UserController.shipmentCancellation);
router.post('/chooseQuantity', validator.validateOrderQuantity,UserController.chooseOrderQuantity);
router.get('/viewcnforders',auth,UserController.viewCnfOrder)


router.post('/initiate-payment', UserController.initiatePayment);
router.post('/webhook', UserController.handleWebhook);
router.post('/create-check-out-session',auth,paymentValidator.validateCreateASession, UserController.createCheckOutSession);
router.post('/operation-inquiry',UserController.operationInquiry);

module.exports = router