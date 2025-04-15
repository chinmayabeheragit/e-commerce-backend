const CartManagementService = require("../Services/user.cartmanagement.service");
const WishListService = require("../Services/user.wishlistmanagement.service");
const OrderManagementService = require("../Services/user.ordermanagement.service");
const userService = require("../Services/user.auth.service");
const OnGoingOrderService = require("../Services/user.ongoing.order.service");
const OrderDeliverdService = require("../Services/user.order.deliverd.service");
const AddressManagementService = require("../Services/user.adressmanagement.service");
const UserProfileService = require("../Services/user.profile.service");
const userProfileService = require("../Services/userProfile.service");
const HomeService = require("../Services/user.home.service");
const RatingAndReviewService = require("../Services/user.rating&review.service");
const productManagementService = require("../Services/vendorProduct.service");
const paymentService = require("../Services/user.payment.service");

const locationService = require("../Services/user.location.service");
const StatusCode = require("../../../common-libs/utils/statusCode");
const response = require("../../../common-libs/response/response");
const mongoose = require("mongoose");

const login = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await userService.login(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Login successfully."
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
          displayMessage: "Something went wrong!",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const register = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const result = await userService.register(req.body);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "registered successfully"
    );
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    if (error.errorCode && error.message && error.displayMessage) {
      return response.handleErrorResponse(error, res);
    } else {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.SERVER_ERROR,
          message: "Internal Server Error",
        },
        res
      );
    }
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
const forgotPassword = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await userService.fogotPassword(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "forget password successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const PasswordReset = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await userService.userPasswordReset(req);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "password is updated successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};

const viewWishlistByUserName = async (req, res) => {
  try {
    const wishlistItems = await WishListService.viewWishlistByUserName(
      req.userName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, wishlistItems },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const removeItemFromWishlist = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await WishListService.removeItemFromWishlist(
      req.params.itemId,
      session
    );

    if (!result) {
      await session.abortTransaction();
      return response.handleErrorResponse(
        { errorCode: StatusCode.NOT_FOUND, message: "Wishlist item not found" },
        res
      );
    }

    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "remove item from wish list successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const addToWishlist = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await WishListService.addToWishlist(
      req.body.productId,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "product add to wishlist successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};


const singleProductOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const productId = req.body.itemId;
    const addressId = req.body.addressId 
    const { userName } = req;

    const result = await OrderManagementService.addSingleProductOrder(
      req.body,
      productId,
      addressId,
      userName,
      session
    );

    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Single product order placed successfully",
      "Order placed successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const cartProductOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
      session.startTransaction();

      const cartId = req.body.cartId; 
      const addressId = req.body.addressId 
      const { userName } = req; 
      const customerName = req.body.CustomerName


      const result = await OrderManagementService.addCartProductOrder(
          cartId,
          addressId,
          userName,
          customerName,
          session
      );

      await session.commitTransaction();
      return response.handleSuccessResponse(
          { successCode: StatusCode.SUCCESS_CODE, result },
          res,
          "Cart products ordered successfully",
          "Order placed successfully"
      );
  } catch (error) {
      await session.abortTransaction();
      if (error.errorCode) {
          return response.handleErrorResponse(error, res);
      }
      return response.handleErrorResponse(
          { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
          res
      );
  } finally {
      session.endSession();
  }
};
const viewAllOrders = async (req, res) => {
  try {
    const { userName } = req; // userName comes from the JWT token
    const userOrders = await OrderManagementService.getAllOrders(userName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, userOrders },
      res,
      "User orders retrieved successfully.",
      "Orders for the specified user have been fetched from the database successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const result = await OrderManagementService.updateOrderStatus(id, status);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "order status updated successfully",
      "The order status has been updated in the database successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to update order status",
      },
      res
    );
  }
};
const shareOrderDetails = async (req, response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const orderWithProducts = await OnGoingOrderService.shareOrderDetails(
      req.params.orderId,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, orderWithProducts },
      res,
      "shared order details successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const chooseOrderQuantity = async (req, res) => {
  try {
    const { orderId, quantity } = req.body;
    const updatedOrder = await OrderManagementService.updateOrderQuantity(orderId, quantity);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, order: updatedOrder },
      res,
      "Order quantity updated successfully",
      "Order quantity updated successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: error.message || "Internal server error" },
      res
    );
  }
};


const addToCart = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await CartManagementService.addToCart(
      req.body.productIds,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products added to cart successfully.",
      "The products have been added to the cart successfully."
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const removeCartProduct = async (req, res) => {
  try {
    const { id: cartId } = req.params; 
    let { productIds } = req.body;   

    if (typeof productIds === 'string') {
      productIds = [productIds]; 
    }

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return response.handleErrorResponse(
        { errorCode: StatusCode.BAD_REQUEST, message: "Invalid product IDs." },
        res
      );
    }

    const userEmail = req.userName;  

    const result = await CartManagementService.removeCartProduct(cartId, productIds, userEmail);

    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res,
      "Products removed from cart successfully.",
      "The products have been removed from the cart successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const ViewCartProduct = async (req, res) => {
  try {
    const result = await CartManagementService.viewProducts( req.userName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Cart products retrieved successfully.",
      "The list of all products in the cart has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const ViewCartTotalPrice = async (req, res) => {
  try {
    const totalPrice = await CartManagementService.calculateTotalPrice();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, totalPrice },
      res,
      "Cart total price retrieved successfully.",
      "The total price of all items in the cart has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const moveItemToCart = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await WishListService.moveItemToCart(
      req.params.itemId,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "product successfully moved to cart"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};

const viewAllProduct = async (req, res) => {
  try {
    const result = await productManagementService.getAllProducts();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "All products retrieved successfully.",
      "The list of all products has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewProdsByCat = async (req, res) => {
  try {
    const result = await productManagementService.getProdsByCat(
      req.body.catName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products retrieved successfully by category.",
      "The list of products under the specified category has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewProdsBySubCat = async (req, res) => {
  try {
    const result = await productManagementService.getProdsBySubCat(
      req.body.catName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products retrieved successfully by subcategory.",
      "The list of products under the specified subcategory has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewProdsByAge = async (req, res) => {
  try {
    const result = await productManagementService.viewProdsByAge(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products filtered by age retrieved successfully.",
      "The list of products filtered by age has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewProductDetailsById = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await productManagementService.getProductById(
      req.params.productId,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, product },
      res,
      "Product details retrieved successfully.",
      "The details of the product have been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};

const viewOngoingOrderByOrderId = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await OnGoingOrderService.getOngoingOrderById(
      req.params.orderId
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, product },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const viewOrderDeliveryStatus = async (req, res) => {
  try {
    const deliveryStatus = await OrderDeliverdService.getOrderDeliveryStatus(
      req.params.userId,
      req.params.orderId,
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, deliveryStatus },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};

const getInvoiceBillById = async (req, response) => {
  try {
    const invoiceBill = await OrderDeliverdService.getInvoiceBillById(
      req.params.invoiceId,
      session
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, invoiceBill },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const addAddress = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await AddressManagementService.addAddress(req.body, req.userName, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Address added successfully"
    );
  } catch (error) {
    await session.abortTransaction();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const editAddress = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await AddressManagementService.editAddress(
      req.params.addressId,
      req.body,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "address edited successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const viewAddresses = async (req, res) => {
  try {
    const result = await AddressManagementService.viewAddress(req.userName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const getAddress = async (req, res) => {
  try {
    const result = await locationService.getLocationDetails(req.body.pincode);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Locaton Fetch Successfully",
      "Locaton Fetch Successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};

const createProfile = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await UserProfileService.createProfile(
      req.body,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Profile created successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to create profile",
      },
      res
    );
  } finally {
    session.endSession();
  }
};
const updateProfile = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await UserProfileService.updateProfile(
      req.body,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Profile updated successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      await session.abortTransaction();
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to update profile",
      },
      res
    );
  } finally {
    session.endSession();
  }
};
const updatePhoneNumber = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { profileId, phoneNumber } = req.params;
    const result = await UserProfileService.updatePhoneNumber(
      profileId,
      phoneNumber,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Phone number updated successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to update the phone number",
      },
      res
    );
  } finally {
    session.endSession();
  }
};
const deactivateAccount = async (req, res) => {
  try {
    const { id, status } = req.params;
    const result = await UserProfileService.deactivateAccount(id, status);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "account deactivated"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewUserProfile = async (req, res) => {
  try {
    if (!req.userName) {
      return response.handleErrorResponse(
        { errorCode: StatusCode.UN_AUTHORIZED, message: "User is not authenticated." },
        res
      );
    }
    const result = await UserProfileService.viewUserProfileByEmail(req.userName);
    if (!result) {
      return response.handleErrorResponse(
        { errorCode: StatusCode.NOT_FOUND, message: "Profile not found." },
        res
      );
    }
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Profile retrieved successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to retrieve profile",
      },
      res
    );
  }
};

const viewBannerById = async (req, res) => {
  try {
    const banner = await HomeService.viewBannerById(req.params.bannerId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, banner },
      res,
      "Banner retrieved successfully.",
      "The banner details have been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to view banner by banner ID",
      },
      res
    );
  }
};
const viewAllBanner = async (req, res) => {
  try {
    const result = await HomeService.viewAllBanner();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "All banners retrieved successfully.",
      "The list of all banners has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Unable to view banner" },
      res
    );
  }
};
const viewProductsByCategory = async (req, res) => {
  try {
    const products = await HomeService.viewProductsByCategory(
      req.params.categoryId
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewAllCategories = async (req, res) => {
  try {
    const categories = await productManagementService.getAllCategory();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, categories },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewAllBrands = async (req, res) => {
  try {
    const brands = await HomeService.viewAllBrands();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, brands },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewStoreById = async (req, res) => {
  try {
    const store = await HomeService.viewStoreById(req.params.storeId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, store },
      res,
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};

const viewAllAgeCategories = async (req, res) => {
  try {
    const ageCategories = await HomeService.viewAllAgeCategories();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, ageCategories },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const shopByDiscount = async (req, res) => {
  try {
    const products = await HomeService.shopByDiscount();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewProductsByAgeCategoryId = async (req, res) => {
  try {
    const products = await HomeService.viewProductsByAgeCategory(
      req.params.ageCategory
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};


const addRatingReviewByProdId = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await RatingAndReviewService.addRatingReview(
      req.params.productId,
      req.body,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Unable to add rating and review by product ID",
      },
      res
    );
  } finally {
    session.endSession();
  }
};
const getRatingReviewsById = async (req, res) => {
  try {
    const ratingReview = await RatingAndReviewService.getRatingReviewsById(req.params.productId);

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, ratingReview },
      res,
      "Operation completed successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const getAllRatingReview = async (req, res) => {
  try {
    const ratingReview = await RatingAndReviewService.getAllRatingReviews();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, ratingReview },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const updateRatingReview = async (req, res) => {
  try {
    const updatedData = req.body;
    const result = await RatingAndReviewService.updateRatingReview(
      req.params.id,
      updatedData
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const deleteRatingReview = async (req, res) => {
  try {
    const deletedRatingReview =
      await RatingAndReviewService.deleteRatingReviews(req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, deletedRatingReview },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewAvgRatingOfProd = async (req, res) => {
  try {
    const result = await RatingAndReviewService.viewAvgRatingOfProd(
      req.params.productId
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};

const saveUser = async (req, res) => {
  try {
    const result = await userProfileService.saveUser(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Register Successful...",
      "Register Successful..."
    );
  } catch (error) {
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.DATA_ALREADY_EXISTS,
          message: error.errmsg,
          displayMessage: `${
            error.keyValue[Object.keys(error.keyValue)[0]]
          } already exists`,
        },
        res
      );
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const updateUser = async (req, res) => {
  try {
    const result = await userProfileService.upUser(
      req.userName,
      req.params.id,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "User Update Successfully",
      "User Update Successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    if (error.code === 11000) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.DATA_ALREADY_EXISTS,
          message: error.errmsg,
          displayMessage: `${
            error.keyValue[Object.keys(error.keyValue)[0]]
          } already exists. Please enter different one.`,
        },
        res
      );
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const loginUser = async (req, res) => {
  try {
    const result = await userProfileService.loginUser(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Login Successfully",
      "Login Successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const delUser = async (req, res) => {
  try {
  } catch (error) {}
};
const viewActiveUser = async (req, res) => {
  try {
  } catch (error) {}
};
const viewDelUser = async (req, res) => {
  try {
  } catch (error) {}
};
const viewAllUser = async (req, res) => {
  try {
  } catch (error) {}
};

const trackOrder = async (req, res) => {
  try {
    const { awbNumber } = req.params;
    const trackingInfo = await OrderManagementService.trackShipment(awbNumber);
    if (!trackingInfo) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.NOT_FOUND,
          message: "Tracking information not found.",
        },
        res
      );
    }

    const updatedOrder = await OrderManagementService.updateOrderStatus(awbNumber, trackingInfo.current_status);

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, trackingInfo: updatedOrder },
      res,
      "Tracking information fetched successfully",
      "Tracking information fetched successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: error.message || "Internal server error" },
      res
    );
  }
};

const trackShipment = async (req, res) => {
  try {
    const result = await ShipmentService.trackShipment(req.params.awb_number);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Shipment tracked successfully"
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Unable to track shipment" },
      res
    );
  }
};
const createForwardShipment = async (req, res) => {
  try {
    const shipmentData = req.body;
    const newShipment = await OrderManagementService.createShipment(shipmentData);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, shipment: newShipment },
      res,
      "Shipment created successfully",
      "Shipment created successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: error.message || "Internal server error" },
      res
    );
  }
};
const ndrData = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await OrderManagementService.ndrData(
      req.body,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "NDR data processed successfully.",
      "The NDR data has been saved to the database successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const shipmentCancellation = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await OrderManagementService.shipmentCancellation(
      req.body,
      req.userName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Shipment cancellation processed successfully.",
      "The shipment cancellation has been saved to the database successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};


const initiatePayment = async (req, res) => {
  try {
    const { amount, currency, description } = req.body;
    const paymentResponse = await TransactionService.initiatePayment(
      amount,
      currency,
      description
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, paymentResponse },
      res,
      "Payment initiated successfully",
      "Payment initiated successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Payment initiation failed",
      },
      res,
      error
    );
  }
};
const handleWebhook = async (req, res) => {
  try {
    const webhookData = req.body;
    await TransactionService.handleWebhook(webhookData);
    return res
      .status(StatusCode.SUCCESS_CODE)
      .send("Webhook handled successfully");
  } catch (error) {
    return res.status(StatusCode.SERVER_ERROR).send("Webhook handling failed");
  }
};
const createCheckOutSession = async (req, res) => {
  try {
    const result = await paymentService.createCheckOutSession(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Checkout session created successfully."
    );
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorCode) {
      const errorCode = error.response.data.errorCode;
      const errorMessage = error.response.data.message;
      switch (errorCode) {
        case 'invalid_body_format':
          return response.handleErrorResponse(
            { errorCode: StatusCode.BAD_REQUEST, message: errorMessage }, 
            res
          );
        default:
          return response.handleErrorResponse(
            { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" }, 
            res
          );
      }
    }
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const operationInquiry = async(req, res)=>{
  try {
    const result = await paymentService.operationInquiry(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Operation details retrieved, including status, payment gateway, method, and shopper info.",
      "Operation details retrieved, including status, payment gateway, method, and shopper info."
    );
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorCode) {
      const errorCode = error.response.data.errorCode;
      const errorMessage = error.response.data.message;
      switch (errorCode) {
        case 'invalid_body_format':
          return response.handleErrorResponse({ errorCode: StatusCode.BAD_REQUEST, message: errorMessage }, res);
        case 'invalid_body_fields':
          return response.handleErrorResponse({ errorCode: StatusCode.BAD_REQUEST, message: errorMessage }, res);
        default:
          return response.handleErrorResponse({ errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" }, res);
      }
    }
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
}
}

const viewCnfOrder = async (req, res) => {
  try {
    const result = await OrderManagementService.viewCnfOrder( req.userName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Cart products retrieved successfully.",
      "The list of all products in the cart has been retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};

module.exports = {
  //authentication
  /**
   * @swagger
   * definitions:
   *   User:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *         description: Name of the user
   *       email:
   *         type: string
   *         format: email
   *         description: Email of the user
   *       password:
   *         type: string
   *         format: password
   *         description: Password of the user
   *       mobileNumber:
   *         type: string
   *         description: Mobile number of the user
   *       resetPasswordToken:
   *         type: string
   *         description: Token for resetting the user's password
   *       resetPasswordExpires:
   *         type: string
   *         description: Expiration date for the reset password token
   */

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: User login
   *     description: Use this API to authenticate a user
   *     tags:
   *       - Authentication
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: credentials
   *         description: The user credentials for login
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - username
   *             - password
   *           properties:
   *             username:
   *               type: string
   *               format: email
   *               description: The username or email address of the user
   *               example: "jhondoe@gmail.com"
   *             password:
   *               type: string
   *               description: The password of the user
   *               example: "5679686"
   *     responses:
   *       200:
   *         description: Successful response indicating successful login
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the login was successful
   *               example: true
   *             message:
   *               type: string
   *               description: Success message
   *               example: "Login successfully"
   *             token:
   *               type: string
   *               description: JWT token
   *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       404:
   *         description: Email not registered
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the login was successful
   *               example: false
   *             errorCode:
   *               type: integer
   *               example: 404
   *             message:
   *               type: string
   *               description: Error message
   *               example: "Email is not registered. Please register your email."
   *             displayMessage:
   *               type: string
   *               description: Display error message
   *               example: "Email is not registered. Please register your email."
   *       401:
   *         description: Incorrect password
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the login was successful
   *               example: false
   *             errorCode:
   *               type: integer
   *               example: 401
   *             message:
   *               type: string
   *               description: Error message
   *               example: "Incorrect password."
   *             displayMessage:
   *               type: string
   *               description: Display error message
   *               example: "Incorrect password."
   *       500:
   *         description: Internal server error
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the login was successful
   *               example: false
   *             errorCode:
   *               type: integer
   *               example: 500
   *             message:
   *               type: string
   *               description: Error message
   *               example: "Internal Server Error"
   *             displayMessage:
   *               type: string
   *               description: Display error message
   *               example: "Something went wrong!"
   */

  login,
  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Register a new user
   *     description: Use this API to register a new user
   *     tags:
   *       - Authentication
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user
   *         description: User data to register
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - name
   *             - email
   *             - password
   *             - mobileNumber
   *           properties:
   *             name:
   *               type: string
   *               example: "John Doe"
   *               description: Full name of the user
   *             email:
   *               type: string
   *               format: email
   *               example: "johndoe@gmail.com"
   *               description: Email address of the user
   *             password:
   *               type: string
   *               format: password
   *               example: "P@ssw0rd"
   *               description: Password for the user account
   *             mobileNumber:
   *               type: string
   *               example: "1234567890"
   *               description: Mobile number of the user
   *     responses:
   *       200:
   *         description: User registered successfully
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the registration was successful
   *               example: true
   *             message:
   *               type: string
   *               description: Success message
   *               example: "User registered successfully"
   *             user:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: User ID
   *                   example: "60d21b4667d0d8992e610c85"
   *                 name:
   *                   type: string
   *                   description: Full name of the user
   *                   example: "John Doe"
   *                 email:
   *                   type: string
   *                   description: Email address of the user
   *                   example: "johndoe@gmail.com"
   *                 mobileNumber:
   *                   type: string
   *                   description: Mobile number of the user
   *                   example: "1234567890"
   *       500:
   *         description: Internal Server Error
   */

  register,
  /**
   * @swagger
   * /forget-password:
   *   post:
   *     summary: Forget Password
   *     description: Use this API to initiate the password reset process
   *     tags:
   *       - Authentication
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: email
   *         description: The email of the admin
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *               description: The email of the admin
   *               example: hypernext@gmail.com
   *     responses:
   *       200:
   *         description: Successful response indicating that the password reset process has been initiated
   *       400:
   *         description: Bad request - Missing or invalid parameters
   *       401:
   *         description: Unauthorized - Invalid credentials
   *       500:
   *         description: Internal server error
   */
  forgotPassword,
  /**
   * @swagger
   * /password-reset/{token}:
   *   post:
   *     summary: Update Password
   *     description: Use this API to update the password using a reset token
   *     tags:
   *       - Authentication
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: token
   *         description: The reset token received via email
   *         required: true
   *         schema:
   *           type: string
   *           example: "resetToken123"
   *       - in: body
   *         name: passwordData
   *         description: The new password and confirm password
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             password:
   *               type: string
   *               description: The new password
   *               example: prabhu1234
   *             confirm_password:
   *               type: string   
   *               description: The confirm password
   *               example: prabhu1234
   *     responses:
   *       200:
   *         description: Successful response indicating successful password update
   *       400:
   *         description: Bad request - Missing or invalid parameters
   *       401:
   *         description: Unauthorized - Invalid or expired token
   *       440:
   *         description: session expired
   *       500:
   *         description: Internal server error
   */
  PasswordReset,
  //order management
/**
 * @swagger
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       CustomerName:
 *         type: string
 *         description: Name of the customer placing the order
 *       TotalAmount:
 *         type: number
 *         description: Total amount of the order
 *       Quantity:
 *         type: number
 *         description: Quantity of the products in the order
 *       status:
 *         type: string
 *         enum: [pending, confirmed, processing, picked, shipped, delivered, cancel, return, request]
 *         default: request
 *         description: Status of the order
 *       createdAt:
 *         type: string
 *         format: date-time
 *         description: Date and time when the order was created
 *       itemPrice:
 *         type: number
 *         description: Price of the individual item
 *       deliveryCharges:
 *         type: number
 *         description: Delivery charges for the order
 */
  //order management
/**
 * @swagger
 * /order/singleProductOrder:
 *   post:
 *     summary: "Add a new single product order"
 *     description: "Creates a new order for a single product."
 *     tags:
 *       - "Order Management"
 *     parameters:
 *       - in: "header"
 *         name: "Authorization"
 *         description: "JWT token obtained during authentication"
 *         required: true
 *         schema:
 *           type: "string"
 *       - in: "body"
 *         name: "Order"
 *         description: "Order object that needs to be added"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             itemId:
 *               type: "string"
 *               description: "ID of the product to be purchased"
 *               example: "60c72b2f4f1a2b001c9f1b77"  
 *             addressId:
 *               type: "string"
 *               description: "id of the chossen address"
 *             deliveryCharges:
 *               type: "number"
 *               description: "Delivery charges for the order"
 *               example: 50.0
 *             CustomerName:
 *               type: "string"
 *               description: "Name of the customer placing the order"
 *               example: "John Doe"
 *     responses:
 *       200:
 *         description: "Single product order added successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 _id:
 *                   type: "string"
 *                   description: "Order ID"
 *                 CustomerName:
 *                   type: "string"
 *                   description: "Name of the customer placing the order"
 *                 TotalAmount:
 *                   type: "number"
 *                   description: "Total amount of the order"
 *                 status:
 *                   type: "string"
 *                   description: "Current status of the order"
 *                 deliveryCharges:
 *                   type: "number"
 *                   description: "Delivery charges for the order"
 *                 createdAt:
 *                   type: "string"
 *                   format: "date-time"
 *                   description: "Order creation time"
 *                 __v:
 *                   type: "integer"
 *                   description: "Version key"
 *       400:
 *         description: "Bad request, invalid input parameters"
 *       401:
 *         description: "Unauthorized, invalid or missing JWT token"
 *       500:
 *         description: "Internal server error"
 */

singleProductOrder,
  /**
   * @swagger
   * /order/update-status/{id}/{status}:
   *   put:
   *     summary: "Update Order Status"
   *     description: "Update the status of an order by ID."
   *     tags:
   *       - "Order Management"
   *     parameters:
   *       - in: "header"
   *         name: "Authorization"
   *         description: "JWT token obtained during authentication"
   *         type: "string"
   *         required: true
   *       - name: "id"
   *         in: "path"
   *         description: "ID of the order to update"
   *         required: true
   *         type: "string"
   *       - name: "status"
   *         in: "path"
   *         description: "New status for the order"
   *         required: true
   *         type: "string"
   *         enum:
   *           - "pending"
   *           - "confirmed"
   *           - "processing"
   *           - "picked"
   *           - "shipped"
   *           - "delivered"
   *           - "cancel"
   *           - "return"
   *           - "request"
   *     responses:
   *       200:
   *         description: "Order status updated successfully"
   *         schema:
   *           $ref: "#/definitions/Order"
   *       400:
   *         description: "Bad request, invalid input parameters"
   *       401:
   *         description: "Unauthorized, invalid or missing JWT token"
   *       404:
   *         description: "Order not found"
   *       500:
   *         description: "Internal server error"
   */
  updateOrderStatus,
  cartProductOrder,
/**
 * @swagger
 * /order/cartProductOrder:
 *   post:
 *     summary: "Order products from cart"
 *     description: "Creates an order for all products in the cart using the cart ID. Aggregates all cart products into a single order."
 *     tags:
 *       - "Order Management"
 *     parameters:
 *       - in: "header"
 *         name: "Authorization"
 *         description: "JWT token obtained during authentication"
 *         required: true
 *         schema:
 *           type: "string"
 *       - in: "body"
 *         name: "CartOrder"
 *         description: "Cart order object that needs to be processed"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             cartId:
 *               type: "string"
 *               description: "ID of the cart to be ordered"
 *             addressId:
 *               type: "string"
 *               description: "id of the chossen address"
 *             deliveryCharges:
 *               type: "number"
 *               description: "Delivery charges for the order"
 *             CustomerName:
 *               type: "string"
 *               description: "Name of the customer placing the order"
 *     responses:
 *       200:
 *         description: "Cart products ordered successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 _id:
 *                   type: "string"
 *                   description: "Order ID"
 *                 CustomerName:
 *                   type: "string"
 *                   description: "Name of the customer placing the order"
 *                 TotalAmount:
 *                   type: "number"
 *                   description: "Total amount of the order"
 *                 deliveryCharges:
 *                   type: "number"
 *                   description: "Delivery charges for the order"
 *                 status:
 *                   type: "string"
 *                   description: "Current status of the order"
 *                 products:
 *                   type: "array"
 *                   items:
 *                     type: "object"
 *                     properties:
 *                       _id:
 *                         type: "string"
 *                         description: "Product ID"
 *                       name:
 *                         type: "string"
 *                         description: "Name of the product"
 *                       regularPrice:
 *                         type: "number"
 *                         description: "Regular price of the product"
 *                       discountPercentage:
 *                         type: "number"
 *                         description: "Discount percentage applied to the product"
 *                       kidztryzCoins:
 *                         type: "number"
 *                         description: "Kidztryz coins earned for this product"
 *                       stockStatus:
 *                         type: "string"
 *                         description: "Stock status of the product"
 *                 createdAt:
 *                   type: "string"
 *                   format: "date-time"
 *                   description: "Order creation time"
 *                 __v:
 *                   type: "integer"
 *                   description: "Version key"
 *       400:
 *         description: "Bad request, invalid input parameters"
 *       401:
 *         description: "Unauthorized, invalid or missing JWT token"
 *       500:
 *         description: "Internal server error"
 */


/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get user's orders
 *     description: Retrieve all orders for the authenticated user based on their JWT token. This endpoint is protected and requires a valid JWT token to access.
 *     tags:
 *       - Order Management
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: "header"
 *         name: "Authorization"
 *         description: "JWT token obtained during authentication"
 *         type: "string"
 *         required: true
 *     responses:
 *       200:
 *         description: "Orders retrieved successfully"
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/Order'
 *       401:
 *         description: "Unauthorized, invalid or missing JWT token"
 *       500:
 *         description: "Internal server error"
 */

  viewAllOrders,

  //cart management
  /**
   * @swagger
   * definitions:
   *   CartItem:
   *     type: object
   *     properties:
   *       _id:
   *         type: string
   *         description: Unique identifier for the cart item
   *       title:
   *         type: string
   *         description: Title of the cart item
   *       description:
   *         type: string
   *         description: Description of the cart item
   *       price:
   *         type: number
   *         description: Price of the cart item
   *       imageUrl:
   *         type: string
   *         description: URL of the image associated with the cart item
   *       colorOptions:
   *         type: array
   *         items:
   *           type: string
   *         description: List of color options available for the cart item
   *       ratings:
   *         type: number
   *         description: Average rating of the cart item
   *       reviews:
   *         type: array
   *         items:
   *           type: object
   *           properties:
   *             user:
   *               type: string
   *               description: User who provided the review
   *             rating:
   *               type: number
   *               description: Rating given by the user
   *             comment:
   *               type: string
   *               description: Comment provided by the user
   *         description: List of reviews for the cart item
   *       shippingInfo:
   *         type: string
   *         description: Shipping information for the cart item
   *       deliveryTime:
   *         type: string
   *         description: Delivery time for the cart item
   *       shippingOptions:
   *         type: array
   *         items:
   *           type: string
   *         description: List of shipping options available for the cart item
   *       returnPolicy:
   *         type: string
   *         description: Return policy for the cart item
   *       relatedProducts:
   *         type: array
   *         items:
   *           type: string
   *         description: List of related products for the cart item
   *       manufacturerDetails:
   *         type: object
   *         properties:
   *           manufacturerName:
   *             type: string
   *             description: Name of the manufacturer
   *           location:
   *             type: string
   *             description: Location of the manufacturer
   *         description: Details of the manufacturer
   *       discount:
   *         type: number
   *         description: Discount applied to the cart item
   *       quantity:
   *         type: number
   *         description: Quantity of the cart item
   *       subtotal:
   *         type: number
   *         description: Subtotal of the cart item
   *       totalPrice:
   *         type: number
   *         description: Total price of the cart item (derived from quantity and price)
   *
   */

  /**
 * @swagger
 * /cart-products:
 *   get:
 *     summary: View products in the cart
 *     description: Retrieve all products in the cart for the authenticated user using their JWT token.
 *     tags:
 *       - Cart Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             email:
 *               type: string
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productDetails:
 *                     $ref: '#/definitions/Product'
 *                   quantity:
 *                     type: integer
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

  ViewCartProduct,
  /**
   * @swagger
   * /total-price:
   *   get:
   *     summary: Calculate total price of all cart items
   *     description: Use this API to calculate the total price of all cart items
   *     tags:
   *       - Cart Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           properties:
   *             totalPrice:
   *               type: number
   *               description: Total price of all cart items
   *       500:
   *         description: Internal Server Error
   */
  ViewCartTotalPrice,
/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add products to cart
 *     description: Use this API to add multiple products to the cart using their product IDs. If the cart does not exist, a new one is created; otherwise, products are added to the existing cart.
 *     tags:
 *       - Cart Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: body
 *         name: cartItem
 *         description: The product IDs to add to the cart
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productIds:
 *               type: array
 *               items:
 *                 type: string
 *               description: IDs of the products to add to the cart
 *           required:
 *             - productIds
 *     responses:
 *       200:
 *         description: Products added to cart successfully. The response includes the updated cart with product details.
 *       500:
 *         description: Internal Server Error. Indicates a server issue.
 */

  addToCart,
/**
 * @swagger
 * /remove-cart-product/{id}:
 *   delete:
 *     summary: Remove a product from the cart
 *     description: Remove one or more products from the user's cart by providing the cart's unique identifier and the product IDs.
 *     tags:
 *       - Cart Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       - in: path
 *         name: id
 *         description: The unique identifier of the cart from which the product(s) will be removed
 *         required: true
 *         schema:
 *           type: string
 *           description: Cart ID
 *       - in: body
 *         name: productIds
 *         description: Product ID(s) to be removed from the cart
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productIds:
 *               oneOf:
 *                 - type: string
 *                 - type: array
 *                   items:
 *                     type: string
 *               description: Single or multiple product IDs to remove
 *     responses:
 *       200:
 *         description: Product(s) removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                   description: Success status code
 *                 result:
 *                   type: object
 *                   properties:
 *                     cartId:
 *                       type: string
 *                       description: The ID of the cart
 *                     removedProductIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of removed product IDs
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 status:
 *                   type: boolean
 *                   description: Success status
 *       401:
 *         description: Unauthorized - User must be logged in to perform this action
 *       404:
 *         description: Cart or product not found - No cart or product with the specified ID was found
 *       500:
 *         description: Internal Server Error
 */

  removeCartProduct,
  //wishlist management
  /**
   * @swagger
   * tags:
   *   - name: Wishlist Management
   *     description: APIs for managing wishlist items
   * definitions:
   *   WishlistItem:
   *     type: object
   *     properties:
   *       _id:
   *         type: string
   *         description: Unique identifier for the wishlist item
   *       title:
   *         type: string
   *         description: Title of the wishlist item
   *       description:
   *         type: string
   *         description: Description of the wishlist item
   *       price:
   *         type: number
   *         description: Price of the wishlist item
   *       imageUrl:
   *         type: string
   *         description: URL of the image associated with the wishlist item
   *       ratings:
   *         type: number
   *         description: Average rating of the wishlist item
   *       reviews:
   *         type: array
   *         items:
   *           type: object
   *           properties:
   *             user:
   *               type: string
   *               description: User who provided the review
   *             rating:
   *               type: number
   *               description: Rating given by the user
   *             comment:
   *               type: string
   *               description: Comment provided by the user
   *         description: List of reviews for the wishlist item
   *       manufacturerDetails:
   *         type: object
   *         properties:
   *           manufacturerName:
   *             type: string
   *             description: Name of the manufacturer
   *           location:
   *             type: string
   *             description: Location of the manufacturer
   *         description: Details of the manufacturer
   */

  /**
   * @swagger
   * /wishlist/{userName}:
   *   get:
   *     summary: View wishlist items
   *     description: Use this API to view wishlist items
   *     tags:
   *       - Wishlist Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/WishlistItem'
   *       500:
   *         description: Internal Server Error
   */
  viewWishlistByUserName,
  /**
   * /wishlist/{itemId}/move-to-cart:
   *   post:
   *     summary: Move item from wishlist to cart
   *     description: Use this API to move an item from the wishlist to the cart
   *     tags:
   *       - Wishlist Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: itemId
   *         description: ID of the item in the wishlist
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the operation was successful
   *             message:
   *               type: string
   *               description: Message indicating the result of the operation
   *       404:
   *         description: Wishlist item not found
   *       500:
   *         description: Moved successfully
   */
  moveItemToCart,
  /**
   * @swagger
   * /wishlist/{itemId}/remove:
   *   delete:
   *     summary: Remove item from wishlist
   *     description: Use this API to remove an item from the wishlist
   *     tags:
   *       - Wishlist Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: path
   *         name: itemId
   *         description: ID of the item in the wishlist
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *               description: Indicates if the operation was successful
   *             message:
   *               type: string
   *               description: Message indicating the result of the operation
   *       404:
   *         description: Wishlist item not found
   *       500:
   *         description: Internal Server Error
   */

  removeItemFromWishlist,
  /**
   *@swagger
   * /wishlist/add:
   *   post:
   *     summary: Add a product to the wishlist
   *     description: Use this API to add a product to the user's wishlist.
   *     tags:
   *       - Wishlist Management
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: WishlistItem
   *         description: Product details to add to the wishlist
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             productId:
   *               type: string
   *               description: ID of the product to add to the wishlist
   *           username:
   *               type: string
   *               description: Username of the user adding the product to the wishlist
   *             # Add other properties if necessary
   *     responses:
   *       200:
   *         description: Product successfully added to the wishlist
   *       400:
   *         description: Bad request. Missing or invalid parameters
   *       500:
   *         description: Internal Server Error
   */
  addToWishlist,

  //individual order
  /**
   * @swagger
   * definitions:
   *   CartItem:
   *     type: object
   *     properties:
   *       productId:
   *         type: string
   *         description: The ID of the product added to the cart
   *       productName:
   *         type: string
   *         description: The name of the product added to the cart
   *       quantity:
   *         type: number
   *         description: The quantity of the product added to the cart
   *       user:
   *         type: string
   *         description: The ID of the user who added the product to the cart
   */
  /**
   *@swagger
   * /product/{productId}:
   *   get:
   *     summary: Get product details by ID
   *     description: Use this endpoint to retrieve details of a product by its ID
   *     tags:
   *       - Individual Order
   *     parameters:
   *       - in: path
   *         name: productId
   *         description: ID of the product to retrieve
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/CartItem'
   *       404:
   *         description: Product not found
   *       500:
   *         description: Internal Server Error
   */
  viewProductDetailsById,
  //ongoing order
  /**
   * @swagger
   * /ongoing/{orderId}:
   *   get:
   *     summary: Get ongoing orders for a user
   *     description: Use this endpoint to retrieve ongoing orders for a specific user
   *     tags:
   *       - ongoing order
   *     parameters:
   *       - in: query
   *         name: userId
   *         description: ID of the user to retrieve ongoing orders
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Order'
   *       500:
   *         description: Internal Server Error
   */
  viewOngoingOrderByOrderId,

  //deliverd order
  /**
   * @swagger
   * /delivery-status/{orderId}:
   *   get:
   *     summary: Get delivery status of an order
   *     description: Use this endpoint to retrieve the delivery status of a specific order
   *     tags:
   *       - delivered order
   *     parameters:
   *       - in: path
   *         name: orderId
   *         description: ID of the order to retrieve delivery status
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: userId
   *         description: ID of the user
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: object
   *           properties:
   *             orderId:
   *               type: string
   *               description: ID of the order
   *             confirmationDate:
   *               type: string
   *               format: date-time
   *               description: Date and time when the order was confirmed
   *             shippingDate:
   *               type: string
   *               format: date-time
   *               description: Date and time when the order was shipped
   *             outForDeliveryDate:
   *               type: string
   *               format: date-time
   *               description: Date and time when the order was out for delivery
   *             deliveredDate:
   *               type: string
   *               format: date-time
   *               description: Date and time when the order was delivered
   *             status:
   *               type: string
   *               description: Current status of the order
   *       404:
   *         description: Order not found
   *       500:
   *         description: Internal Server Error
   */
  viewOrderDeliveryStatus,
  //address management
  /**
   * @swagger
   *  tags:
   *   - name: Address Management
   *     description: APIs for managing orders
   *   - name: Address Management
   *     description: APIs for managing cart products
   * definitions:
   *   Address:
   *     type: object
   *     properties:
   *       fullName:
   *         type: string
   *         description: Full name associated with the address
   *       phoneNumber:
   *         type: string
   *         description: Phone number associated with the address
   *       pinCode:
   *         type: number
   *         description: Pin code of the address
   *       state:
   *         type: string
   *         description: State of the address
   *       city:
   *         type: string
   *         description: City of the address
   *       landmark:
   *         type: string
   *         description: Landmark near the address
   *       houseNo:
   *         type: string
   *         description: House number or apartment number of the address
   */

  /**
   * @swagger
   * /addresses/add:
   *   post:
   *     summary: Add a new address
   *     description: Use this API to add a new address to the system
   *     tags:
   *       - Address Management
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: address
   *         description: Address data to be added
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Address'
   *     responses:
   *       200:
   *         description: Address added successfully
   *         schema:
   *           $ref: '#/definitions/Address'
   *       500:
   *         description: Internal Server Error
   */
  addAddress,
  /**
   * @swagger
   * /updateaddress/{addressId}:
   *   put:
   *     summary: Update an existing address
   *     description: Use this API to update an existing address in the system
   *     tags:
   *       - Address Management
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: addressId
   *         description: ID of the address to update
   *         required: true
   *         type: string
   *       - in: body
   *         name: addressData
   *         description: Updated address data
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Address'
   *     responses:
   *       200:
   *         description: Address updated successfully
   *         schema:
   *           $ref: '#/definitions/Address'
   *       404:
   *         description: Address not found
   *       500:
   *         description: Internal Server Error
   */
  editAddress,
  /**
   * @swagger
   * /addresses:
   *   get:
   *     summary: Get address of user
   *     description: Use this endpoint to retrieve user address
   *     tags:
   *       - Address Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: OK
   *       404:
   *         description: Order not found
   *       500:
   *         description: Internal Server Error
   */
  viewAddresses,
  //profile management
  /**
   * @swagger
   * tags:
   *   - name:  User Profile Management
   *     description: APIs for user profile
   * definitions:
   *   UserProfile:
   *     type: object
   *     properties:
   *       user:
   *         type: string
   *         description: Unique identifier for the user profile
   *       userImage:
   *         type: string
   *         description: Image URL for the user profile
   *       firstName:
   *         type: string
   *         description: First name of the user
   *       lastName:
   *         type: string
   *         description: Last name of the user
   *       mobileNumber:
   *         type: string
   *         description: Mobile number of the user
   *       status:
   *         type: string
   *         enum: [active, deactivate]
   *         default: active
   *       email:
   *         type: string
   *         description: Email address of the user
   *         format: email
   */
  createProfile,
  /**
   * @swagger
   * /createprofile:
   *   post:
   *     summary: Create a new user profile
   *     description: Use this API to create a new user profile.
   *     tags:
   *       - User Profile Management
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - in: body
   *         name: body
   *         description: User profile details to create
   *         required: true
   *         schema:
   *           $ref: '#/definitions/UserProfile'
   *     responses:
   *       200:
   *         description: User profile created successfully
   *         schema:
   *           $ref: '#/definitions/UserProfile'
   *       409:
   *         description: Profile already exists
   *         schema:
   *           type: object
   *           properties:
   *             errorCode:
   *               type: integer
   *               example: 409
   *             message:
   *               type: string
   *               example: "Profile already exists"
   *             displayMessage:
   *               type: string
   *               example: "A profile using this email already exists"
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */

  updateProfile,
  /**
 * @swagger
 * /update/profile:
 *   put:
 *     summary: Update user profile
 *     description: Use this API to update the user profile.
 *     tags:
 *       - User Profile Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: body
 *         name: updatedProfile
 *         description: Updated details of the user profile
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             mobileNumber:
 *               type: string
 *             profileImage:
 *               type: string
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             mobileNumber: "1234567890"
 *             profileImage: "http://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: Profile successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserProfile'
 *       500:
 *         description: Internal Server Error
 */

  updatePhoneNumber,
/**
 * @swagger
 * /user/update/{profileId}/{phoneNumber}:
 *   put:
 *     summary: Update user phone number
 *     description: Use this API to update the user's phone number.
 *     tags:
 *       - User Profile Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *       - in: path
 *         name: profileId
 *         description: ID of the profile to update
 *         required: true
 *         type: string
 *       - in: path
 *         name: phoneNumber
 *         description: Updated phone number of the user
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Phone number successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Phone number successfully updated"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                       example: "60d21b4667d0d8992e610c85"
 *                     name:
 *                       type: string
 *                       description: Full name of the user
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: Email address of the user
 *                       example: "johndoe@gmail.com"
 *                     mobileNumber:
 *                       type: string
 *                       description: Mobile number of the user
 *                       example: "1234567890"
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Profile not found"
 *       409:
 *         description: Phone number already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Phone number already in use"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Internal Server Error"
 */


  deactivateAccount,
  /**
   * @swagger
   * /deactivate-account/{id}/{status}:
   *   put:
   *     summary: Update user status
   *     description: Use this API to update the user account status.
   *     tags:
   *       - User Profile Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         type: string
   *         required: true
   *       - name: "id"
   *         in: "path"
   *         description: "Give the User Profile ID"
   *         required: true
   *         type: "string"
   *       - name: "status"
   *         in: "path"
   *         description: "Chose The Status"
   *         required: true
   *         type: "string"
   *         enum:
   *           - "active"
   *           - "deactivate"
   *     responses:
   *       200:
   *         description: Account status updated successfully
   *       401:
   *         description: Unauthorized - Invalid or missing authentication token
   *       500:
   *         description: Internal Server Error
   */
  viewUserProfile,
/**
 * @swagger
 * /getUserProfile:
 *   get:
 *     summary: Get profile details based on JWT token
 *     description: Use this API to view the user profile based on the JWT token provided in the header.
 *     tags:
 *       - User Profile Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                   example: 200
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "PROD-USER-ENQ-abc123"
 *                     userImage:
 *                       type: string
 *                       example: "default.jpg"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     user:
 *                       type: string
 *                       example: "john_doe"
 *       400:
 *         description: Bad Request, JWT token not provided or invalid
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */




  //home
  /**
   * @swagger
   * /banners/{bannerId}:
   *   get:
   *     tags:
   *       - home
   *     summary: View banner by ID
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: bannerId
   *         in: path
   *         description: ID of the banner to view
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewBannerById,
  /**
   * @swagger
   * /banners:
   *   get:
   *     tags:
   *       - home
   *     summary: View banners
   *     responses:
   *       200:
   *         description: Successful operation
   *
   */
  viewAllBanner,
  /**
   * @swagger
   * /products/category/{categoryId}:
   *   get:
   *     tags:
   *       - home
   *     summary: View products by category
   *     parameters:
   *       - name: categoryId
   *         in: path
   *         description: ID of the category to filter products
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewProductsByCategory,

  /**
   * @swagger
   * /categories:
   *   get:
   *     tags:
   *       - home
   *     summary: View all categories
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewAllCategories,

  /**
   * @swagger
   * /brands:
   *   get:
   *     tags:
   *       - home
   *     summary: View all brands
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewAllBrands,

  /**
   * @swagger
   * /shop/discount:
   *   get:
   *     tags:
   *       - home
   *     summary: Shop by discount
   *     responses:
   *       200:
   *         description: Successful operation
   */
  shopByDiscount,

  /**
   * @swagger
   * /stores/{storeId}:
   *   get:
   *     tags:
   *       - home
   *     summary: View store by ID
   *     parameters:
   *       - name: storeId
   *         in: path
   *         description: ID of the store to view
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   *       404:
   *         description: Store not found
   *       500:
   *         description: Internal server error
   */
  viewStoreById,

  /**
   * @swagger
   * /age-categories:
   *   get:
   *     tags:
   *       - home
   *     summary: View all age categories
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewAllAgeCategories,

  /**
   * @swagger
   * /products/age-category/{ageCategoryId}:
   *   get:
   *     tags:
   *       - home
   *     summary: View products by age category
   *     parameters:
   *       - name: ageCategoryId
   *         in: path
   *         description: ID of the age category to filter products
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Successful operation
   */
  viewProductsByAgeCategoryId,

  //rating and review
  /**
   *  @swagger
   * tags:
   *   name: Rating and Review
   *   description: API endpoints for managing ratings and reviews
   * definitions:
   *   RatingReview:
   *     type: object
   *     properties:
   *       rating:
   *         type: number
   *         description: Rating given by the reviewer
   *         enum: [1, 2, 3, 4, 5]
   *       review:
   *         type: string
   *         description: Review content provided by the reviewer
   *       productImage:
   *         type: array
   *         items:
   *           type: string
   *           description: URL of the product image
   *
   */

  /**
   * @swagger
   * /ratingReview/add/{productId}:
   *   post:
   *     summary: Add a new rating and review
   *     description: Use this API to add a new rating and review
   *     tags:
   *       - Rating and Review
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *       - name: productId
   *         in: path
   *         required: true
   *         type: string
   *       - in: body
   *         name: ratingReview
   *         description: Rating and review details to store
   *         required: true
   *         schema:
   *           $ref: '#/definitions/RatingReview'
   *     responses:
   *       201:
   *         description: Successfully added rating and review
   *         schema:
   *           $ref: '#/definitions/RatingReview'
   *       404:
   *         description: Product not found
   *         schema:
   *           type: object
   *           properties:
   *             errorCode:
   *               type: integer
   *               example: 404
   *             message:
   *               type: string
   *               example: "Product not found."
   *             displayMessage:
   *               type: string
   *               example: "The product ID provided does not exist."
   *       500:
   *         description: Internal Server Error
   */

  addRatingReviewByProdId,
  /**
   * @swagger
   * /ratingReview:
   *   get:
   *     summary: Get all ratings and reviews
   *     description: Use this API to retrieve all ratings and reviews
   *     tags:
   *       - Rating and Review
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/RatingReview'
   *       500:
   *         description: Internal Server Error
   */
  getAllRatingReview,

  /**
   * @swagger
   * /ratingReview/{productId}:
   *   get:
   *     summary: Get a rating and review by ID
   *     description: Use this API to retrieve a rating and review by its ID
   *     tags:
   *       - Rating and Review
   *     parameters:
   *       - in: path
   *         name: productId
   *         description: product id of the rating and review to retrieve
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *           $ref: '#/definitions/RatingReview'
   *       404:
   *         description: Rating and review not found
   *       500:
   *         description: Internal Server Error
   */
  getRatingReviewsById,

  /**
   * @swagger
   * /update/{id}:
   *   put:
   *     summary: Update a rating and review by ID
   *     description: Use this API to update a rating and review by its ID
   *     tags:
   *       - Rating and Review
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the rating and review to update
   *         required: true
   *         type: string
   *       - in: body
   *         name: ratingReview
   *         description: Updated rating and review details
   *         required: true
   *         schema:
   *           $ref: '#/definitions/RatingReview'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully updated rating and review
   *         schema:
   *           $ref: '#/definitions/RatingReview'
   *       404:
   *         description: Rating and review not found
   *       500:
   *         description: Internal Server Error
   */
  updateRatingReview,
  /**
   * @swagger
   * /ratingReview/{id}:
   *   delete:
   *     summary: Delete a rating and review by ID
   *     description: Use this API to delete a rating and review by its ID
   *     tags:
   *       - Rating and Review
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the rating and review to delete
   *         required: true
   *         type: string
   *       - in: header
   *         name: Authorization
   *         description: JWT token obtained during authentication
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully deleted rating and review
   *       404:
   *         description: Rating and review not found
   *         schema:
   *           type: object
   *           properties:
   *             errorCode:
   *               type: integer
   *               example: 404
   *             message:
   *               type: string
   *               example: "Rating and review not found."
   *             displayMessage:
   *               type: string
   *               example: "Rating and review with ID [id] does not exist."
   *       500:
   *         description: Internal Server Error
   */

  deleteRatingReview,

  /**
   * @swagger
   * /ratingAvg/{productId}:
   *   get:
   *     summary: Get a average rating of the product
   *     description: Use this API to retrieve average rating of the product.
   *     tags:
   *       - Rating and Review
   *     parameters:
   *       - in: path
   *         name: productId
   *         description: product id of the rating and review to retrieve
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: OK
   *       404:
   *         description: Rating and review not found
   *       500:
   *         description: Internal Server Error
   */
  viewAvgRatingOfProd,
  /**
   * @swagger
   * tags:
   *   name: product Management
   * /getAllProds:
   *   get:
   *     summary: View all products
   *     description: Use this API to view all products.
   *     tags:
   *       - product Management
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal server error
   */
  viewAllProduct,
  /**
   * @swagger
   * /getAllProdsByCat:
   *   post:
   *     summary: get products by category
   *     description: Use this API to view products base on the category.
   *     tags:
   *       - product Management
   *     parameters:
   *       - in: body
   *         name: category name
   *         description: view products
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             catName:
   *                 type: string
   *           example:
   *              catName: "Fashion"
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  viewProdsByCat,
  /**
   * @swagger
   * /getAllProdsBySubCat:
   *   post:
   *     summary: get products by sub-category
   *     description: Use this API to view products base on the sub-category.
   *     tags:
   *       - product Management
   *     parameters:
   *       - in: body
   *         name: sub-category name
   *         description: view products
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             catName:
   *                 type: string
   *           example:
   *              catName: "Fashion"
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  viewProdsBySubCat,
  /**
   * @swagger
   * /view-products-ages:
   *   post:
   *     summary: View products by age
   *     description: Use this API to view products based on age range
   *     tags:
   *       - product Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Age range to filter products
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             age:
   *               type: string
   *               enum: ['0-6', '6-12', '12-18', '18-24', '24+']
   *               description: |
   *                 Specifies the age range. Choose from: 0-6, 6-12, 12-18, 18-24, or 24+.
   *     responses:
   *       200:
   *         description: Success. Retrieved products by age.
   *       400:
   *         description: Bad Request. Invalid input data.
   *       401:
   *         description: Unauthorized. Access token is missing or invalid.
   *       500:
   *         description: Internal Server Error. Failed to retrieve products by age.
   */
  viewProdsByAge,

  saveUser,

  updateUser,

  loginUser,
  delUser,
  viewActiveUser,
  viewDelUser,
  viewAllUser,
  /**
   * @swagger
   * /pincode:
   *   post:
   *     summary: Get address by pincode
   *     description: Use this API to get address details based on a pincode
   *     tags:
   *       - Location Management
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: Pincode to get address details
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             pincode:
   *               type: number
   *               description: The pincode for which address details are required.
   *               example: 110001
   *     responses:
   *       200:
   *         description: Success. Address details retrieved successfully.
   *       400:
   *         description: Bad Request. Invalid input data.
   *       404:
   *         description: Not Found. No address found for the provided pincode.
   *       500:
   *         description: Internal Server Error. Failed to retrieve address details.
   */
  getAddress,
  shareOrderDetails,
  getInvoiceBillById,
  trackOrder,
  /**
 * @swagger
 * /track-order/{awbNumber}:
 *   get:
 *     summary: Track an order
 *     description: Fetch the tracking status of an order by AWB number.
 *     tags:
 *       - Order Management
 *     parameters:
 *       - in: path
 *         name: awbNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: AWB number of the order
 *     responses:
 *       200:
 *         description: Successfully fetched tracking information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                   example: 200
 *                 trackingInfo:
 *                   type: object
 *                   description: Tracking information
 *                   properties:
 *                     awbNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     current_status:
 *                       type: string
 *                       example: "Delivered"
 *                     details:
 *                       type: object
 *                       description: Additional tracking details
 *       404:
 *         description: Tracking information not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Tracking information not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error tracking order"
 */

  //tracking 
 
  shipmentCancellation,
  /**
 * @swagger
 * /shipment-cancellation:
 *   post:
 *     summary: "Process Shipment Cancellation"
 *     description: "Handles the processing of shipment cancellation requests."
 *     tags:
 *       - "Shipment Management"
 *     parameters:
 *       - in: "header"
 *         name: "Authorization"
 *         description: "JWT token obtained during authentication"
 *         type: "string"
 *         required: true
 *       - in: "body"
 *         name: "cancellationData"
 *         description: "Details of the shipment cancellation request"
 *         schema:
 *           type: "object"
 *           properties:
 *             awbNumber:
 *               type: "string"
 *               description: "The AWB number of the shipment to be cancelled."
 *               example: "1234567890"
 *             cancellationReason:
 *               type: "string"
 *               description: "Reason for cancelling the shipment."
 *               example: "Customer request"
 *             cancelledBy:
 *               type: "string"
 *               description: "The username of the person processing the cancellation."
 *               example: "john_doe"
 *             cancelledAt:
 *               type: "string"
 *               format: "date-time"
 *               description: "The date and time when the shipment was cancelled."
 *               example: "2024-08-05T12:34:56Z"
 *           required:
 *             - awbNumber
 *             - cancellationReason
 *             - cancelledBy
 *             - cancelledAt
 *     responses:
 *       200:
 *         description: "Shipment cancellation processed successfully."
 *         schema:
 *           type: "object"
 *           properties:
 *             successCode:
 *               type: "integer"
 *               example: 200
 *             result:
 *               type: "object"
 *               properties:
 *                 awbNumber:
 *                   type: "string"
 *                   example: "1234567890"
 *                 cancellationReason:
 *                   type: "string"
 *                   example: "Customer request"
 *                 cancelledBy:
 *                   type: "string"
 *                   example: "john_doe"
 *                 cancelledAt:
 *                   type: "string"
 *                   format: "date-time"
 *                   example: "2024-08-05T12:34:56Z"
 *       400:
 *         description: "Bad request, invalid input parameters."
 *       401:
 *         description: "Unauthorized, invalid or missing JWT token."
 *       500:
 *         description: "Internal server error."
 */

  ndrData,
  /**
 * @swagger
 * /ndr-data:
 *   post:
 *     summary: "Process NDR Data"
 *     description: "Handles the processing of NDR (Non-Delivery Report) data for shipments."
 *     tags:
 *       - "Shipment Management"
 *     parameters:
 *       - in: "header"
 *         name: "Authorization"
 *         description: "JWT token obtained during authentication"
 *         type: "string"
 *         required: true
 *       - in: "body"
 *         name: "ndrData"
 *         description: "Details of the NDR data to be processed"
 *         schema:
 *           type: "object"
 *           properties:
 *             awbNumber:
 *               type: "string"
 *               description: "The AWB number associated with the NDR data."
 *               example: "1234567890"
 *             ndrDetails:
 *               type: "object"
 *               description: "Details of the NDR."
 *               example:
 *                 reason: "Failed delivery attempt"
 *                 attemptedOn: "2024-08-04T10:30:00Z"
 *             createdBy:
 *               type: "string"
 *               description: "The username of the person who created the NDR data."
 *               example: "john_doe"
 *             createdAt:
 *               type: "string"
 *               format: "date-time"
 *               description: "The date and time when the NDR data was created."
 *               example: "2024-08-05T12:34:56Z"
 *           required:
 *             - awbNumber
 *             - ndrDetails
 *             - createdBy
 *             - createdAt
 *     responses:
 *       200:
 *         description: "NDR data processed successfully."
 *         schema:
 *           type: "object"
 *           properties:
 *             successCode:
 *               type: "integer"
 *               example: 200
 *             result:
 *               type: "object"
 *               properties:
 *                 awbNumber:
 *                   type: "string"
 *                   example: "1234567890"
 *                 ndrDetails:
 *                   type: "object"
 *                   example:
 *                     reason: "Failed delivery attempt"
 *                     attemptedOn: "2024-08-04T10:30:00Z"
 *                 createdBy:
 *                   type: "string"
 *                   example: "john_doe"
 *                 createdAt:
 *                   type: "string"
 *                   format: "date-time"
 *                   example: "2024-08-05T12:34:56Z"
 *       400:
 *         description: "Bad request, invalid input parameters."
 *       401:
 *         description: "Unauthorized, invalid or missing JWT token."
 *       500:
 *         description: "Internal server error."
 */

  
// Forward Shipment Model
/**
 * @swagger
 * tags:
 *   name: Forward Shipment
 *   description: API endpoints for managing forward shipments
 * definitions:
 *   ForwardShipment:
 *     type: object
 *     properties:
 *       awb_number:
 *         type: string
 *         description: Unique AWB number for tracking the shipment.
 *         example: "1234567890"
 *       order_number:
 *         type: string
 *         description: Customer reference number for tracking the order.
 *         example: "ORD12345"
 *       product:
 *         type: string
 *         description: Indicates whether the order is COD (Cash on Delivery) or PPD (Prepaid).
 *         enum:
 *           - COD
 *           - PPD
 *         example: "COD"
 *       consignee:
 *         type: string
 *         description: Name of the consignee.
 *         example: "John Doe"
 *       consignee_address1:
 *         type: string
 *         description: Address line 1 for the consignee.
 *         example: "123 Main St"
 *       consignee_address2:
 *         type: string
 *         description: Address line 2 for the consignee (optional).
 *         example: "Apt 4B"
 *       consignee_address3:
 *         type: string
 *         description: Address line 3 for the consignee (optional).
 *         example: "Building 5"
 *       destination_city:
 *         type: string
 *         description: City of the consignee.
 *         example: "New York"
 *       pincode:
 *         type: string
 *         description: Consignee's postal code.
 *         example: "10001"
 *       state:
 *         type: string
 *         description: Consignee's state.
 *         example: "NY"
 *       mobile:
 *         type: string
 *         description: Consignee's mobile number.
 *         example: "1234567890"
 *       telephone:
 *         type: string
 *         description: Consignee's telephone number (optional).
 *         example: "0987654321"
 *       item_description:
 *         type: string
 *         description: Description of the item being shipped.
 *         example: "Electronics"
 *       pieces:
 *         type: integer
 *         description: Number of items in the shipment.
 *         example: 2
 *       collectable_value:
 *         type: number
 *         description: Amount to be collected for COD shipments.
 *         default: 0
 *         example: 50
 *       declared_value:
 *         type: number
 *         description: Value of the shipment for invoice purposes.
 *         example: 500
 *       actual_weight:
 *         type: number
 *         description: Actual weight of the shipment.
 *         example: 2.5
 *       volumetric_weight:
 *         type: number
 *         description: Volumetric weight of the shipment.
 *         example: 3
 *       length:
 *         type: number
 *         description: Length of the shipment package.
 *         example: 30
 *       breadth:
 *         type: number
 *         description: Breadth of the shipment package.
 *         example: 20
 *       height:
 *         type: number
 *         description: Height of the shipment package.
 *         example: 10
 *       pickup_name:
 *         type: string
 *         description: Name of the pickup point.
 *         example: "Warehouse A"
 *       pickup_address_line1:
 *         type: string
 *         description: Address line 1 of the pickup point.
 *         example: "456 Pickup Rd"
 *       pickup_address_line2:
 *         type: string
 *         description: Address line 2 of the pickup point (optional).
 *         example: "Suite 101"
 *       pickup_pincode:
 *         type: string
 *         description: Pincode of the pickup point.
 *         example: "10002"
 *       pickup_phone:
 *         type: string
 *         description: Telephone number of the pickup point (optional).
 *         example: "1234567890"
 *       pickup_mobile:
 *         type: string
 *         description: Mobile number of the pickup point.
 *         example: "0987654321"
 *       return_name:
 *         type: string
 *         description: Return point name.
 *         example: "Return Center"
 *       return_address_line1:
 *         type: string
 *         description: Address line 1 of the return point.
 *         example: "789 Return St"
 *       return_address_line2:
 *         type: string
 *         description: Address line 2 of the return point (optional).
 *         example: "Floor 2"
 *       return_pincode:
 *         type: string
 *         description: Pincode of the return point.
 *         example: "10003"
 *       return_phone:
 *         type: string
 *         description: Telephone number of the return point (optional).
 *         example: "1234567890"
 *       return_mobile:
 *         type: string
 *         description: Mobile number of the return point.
 *         example: "0987654321"
 *       dg_shipment:
 *         type: boolean
 *         description: Indicates if the shipment contains items restricted for air travel.
 *         default: false
 *         example: false
 *     required:
 *       - awb_number
 *       - order_number
 *       - product
 *       - consignee
 *       - consignee_address1
 *       - destination_city
 *       - pincode
 *       - state
 *       - mobile
 *       - item_description
 *       - pieces
 *       - declared_value
 *       - actual_weight
 *       - volumetric_weight
 *       - length
 *       - breadth
 *       - height
 *       - pickup_name
 *       - pickup_address_line1
 *       - pickup_pincode
 *       - pickup_mobile
 *       - return_name
 *       - return_address_line1
 *       - return_pincode
 *       - return_mobile
 */
createForwardShipment,
/**
 * @swagger
 * /forward-manifest:
 *   post:
 *     summary: Create a forward shipment manifest
 *     description: Upload order details for pickup and delivery.
 *     tags:
 *       - Forward Shipment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Details of the shipment to be manifested.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ForwardShipment'
 *     responses:
 *       200:
 *         description: Manifest successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Manifest created successfully"
 *                 shipment:
 *                   $ref: '#/definitions/ForwardShipment'
 *       400:
 *         description: Bad request, invalid input parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Error creating manifest"
 */


chooseOrderQuantity,
/**
 * @swagger
 * /chooseQuantity:
 *   post:
 *     summary: Update the quantity of an existing order
 *     description: Use this API to update the quantity of an order based on the provided order ID and quantity.
 *     tags:
 *       - Order Management
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         description: Order quantity details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             orderId:
 *               type: string
 *               description: The ID of the order to update
 *             quantity:
 *               type: number
 *               description: The new quantity for the order (must be between 3 and 5)
 *           required:
 *             - orderId
 *             - quantity
 *     responses:
 *       200:
 *         description: Order quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: integer
 *                   example: 200
 *                 order:
 *                   $ref: '#/definitions/Order'
 *                 message:
 *                   type: string
 *                   example: "Order quantity updated successfully"
 *       400:
 *         description: Invalid quantity or request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Quantity must be between 3 and 5."
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Order not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
  trackShipment,
  handleWebhook,
  initiatePayment,
  createCheckOutSession,
 /**
 * @swagger
 * /create-check-out-session:
 *   post:
 *     summary: Create a checkout session
 *     description: |
 *       This endpoint generates a checkout session representing payment and shopper information that is available on the Checkout page.
 *     tags:
 *       - Payment Management
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token for authentication.
 *         required: true
 *         type: string
 *         example: your_access_token
 *       - in: body
 *         name: paymentDetails
 *         description: Request model for creating a checkout session
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             context:
 *               type: object
 *               properties:
 *                 countryCode:
 *                   type: string
 *                   example: IN
 *                 orderId:
 *                   type: string
 *                   example: test12
 *             money:
 *               type: object
 *               properties:
 *                 currencyCode:
 *                   type: string
 *                   example: INR
 *             frontendReturnUrl:
 *               type: string
 *               example: https://www.google.com/
 *             statusNotifyUrl:
 *               type: string
 *               example: https://www.facebook.com/login.php
 *             frontendBackUrl:
 *               type: string
 *               example: https://www.instagram.com/
 *     responses:
 *       '200':
 *         description: Successfully created checkout session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   example: session_1234567890
 *                 redirectUrl:
 *                   type: string
 *                   example: https://www.yourwebsite.com/checkout/session_1234567890
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */


  operationInquiry,
   /**
   * @swagger
   * /operation-inquiry:
   *   post:
   *     summary: checkout operation inquiry
   *     description: This endpoint fetches the details such as status, payment gateway, payment method and shopper details, for the requested operation
   *     tags:
   *       - Payment Management
   *     parameters:
   *       - in: body
   *         name: Redirection Result
   *         description: Request model for creating a checkout session
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             token:
   *               type: string
   *               example: your-redirectionResult
   *     responses:
   *       '200':
   *         description: Successfully created checkout session
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 sessionId:
   *                   type: string
   *                   example: session_1234567890
   *                 redirectUrl:
   *                   type: string
   *                   example: https://www.yourwebsite.com/checkout/session_1234567890
   *       '400':
   *         description: Bad request
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal server error
   */
   viewCnfOrder,
   /**
 * @swagger
 * /viewcnforders:
 *   get:
 *     summary: Retrieve all confirmed orders.
 *     description: Retrieves all confirmed orders for the authenticated user.
 *     tags:
 *       - Confirm Order
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained during authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of all confirmed orders for the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: string
 *                   example: 200
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: PROD-CONFIRM-ORDER-jNFGt45x
 *                       orderId:
 *                         type: string
 *                         example: ORD12345
 *                       CustomerName:
 *                         type: string
 *                         example: John Doe
 *                       TotalAmount:
 *                         type: number
 *                         example: 250.75
 *                       Quantity:
 *                         type: number
 *                         example: 3
 *                       paid:
 *                         type: boolean
 *                         example: true
 *                       status:
 *                         type: string
 *                         example: Shipped
 *                       productDetails:
 *                         type: object
 *                         example: { "productName": "Laptop", "price": 850, "quantity": 1 }
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-09-14T08:23:00Z
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */

};
