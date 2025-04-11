const StatusCode = require("../../../common-libs/utils/statusCode");
const response = require("../../../common-libs/response/response");
const mongoose = require("mongoose");
const categoryService = require("../services/category.service");
const BrandAdminService = require("../services/adminbrand.service");
const bannerService = require("../services/banner.service");
const vendorService = require("../services/vendor.service");
const CustomerAdminServices = require("../services/customer.service");
const CouponAdminService = require("../services/coupon.service");
const TransactionAdminService = require("../services/transaction.service");
const PinUserService = require("../services/userpin.service");
const productManagementService = require("../services/vendorProduct.service");
const orderManagementService = require("../services/ordermanagemeht.service");
const addCategory = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await categoryService.addCategory(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category added successfully.",
      "The category has been successfully added."
    );
  } catch (error) {
    await session.abortTransaction();
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
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const viewCategories = async (req, res) => {
  try {
    const allCategories = await categoryService.viewCategories();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, allCategories },
      res,
      "Categories retrieved successfully.",
      "The categories have been successfully retrieved."
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
const editCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.editCategory(
      req.params.categoryId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, updatedCategory },
      res,
      "Category updated successfully.",
      "The category has been successfully updated."
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
const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.categoryId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category deleted successfully.",
      "The category has been successfully deleted."
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
const viewCategory_categoryId = async (req, res) => {
  try {
    const Category = await categoryService.viewCategory_categoryId(
      req.params.categoryId
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, Category },
      res,
      "Category details retrieved successfully.",
      "The category details have been successfully retrieved."
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
const findStatusAccCat = async (req, res) => {
  try {
    const result = await categoryService.findStatusAccCat();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Categories with the specified status retrieved successfully.",
      "The categories with the specified status have been successfully retrieved."
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
const viewReqCatByVendor = async (req, res) => {
  try {
    const result = await categoryService.viewReqCatByVendor();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Requested categories by the vendor retrieved successfully.",
      "The requested categories by the vendor have been successfully retrieved."
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
const upCatStatus = async (req, res) => {
  try {
    const result = await categoryService.upCatStatus(
      req.params.id,
      req.body.status
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category status updated successfully.",
      "The category status has been successfully updated."
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
const addbrand = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await BrandAdminService.addbrand(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand added successfully.",
      "The new brand has been added to the KIDTRYZ."
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewbrand = async (req, res) => {
  try {
    const products = await BrandAdminService.getallbrand();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res,
      "Brands retrieved successfully.",
      "The list of all brands has been retrieved."
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
const viewRequestedBrand = async (req, res) => {
  try {
    const products = await BrandAdminService.viewRequestedBrand();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res,
      "Requested brands retrieved successfully.",
      "The list of requested brands has been retrieved."
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

const updatebrand = async (req, res) => {
  try {
    const result = await BrandAdminService.updatebrand(
      req.params.brandId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand updated successfully.",
      "The brand information has been successfully updated."
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
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const upBrandStatus = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await BrandAdminService.upBrandStatus(
      req.params.id,
      req.body.status
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand status updated successfully.",
      "The brand status has been successfully updated."
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
const deletebrand = async (req, res) => {
  try {
    const result = await BrandAdminService.deletebrand(
      req.params.brandId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand deleted successfully.",
      "The brand has been successfully deleted."
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
const getbrandById = async (req, res) => {
  try {
    const result = await BrandAdminService.getbrandbyid(req.params.brandId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand retrieved successfully.",
      "The brand information has been successfully retrieved."
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
const addBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await bannerService.addBanner(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Banner added successfully.",
      "The banner has been successfully added."
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const listBanners = async (req, res) => {
  try {
    const allBanners = await bannerService.listBanners();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, allBanners },
      res,
      "Banners listed successfully.",
      "All banners have been successfully listed."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const editBanner = async (req, res) => {
  try {
    const result = await bannerService.editBanner(
      req.params.bannerId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Banner updated successfully.",
      "The banner has been successfully updated."
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
const deleteBanner = async (req, res) => {
  try {
    const result = await bannerService.deleteBanner(req.params.bannerId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Banner deleted successfully.",
      "The banner has been successfully deleted."
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
const addVendor = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await vendorService.addVendor(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Vendor details saved successfully.",
      "Vendor details have been successfully saved."
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const listVendors = async (req, res) => {
  try {
    const allVendors = await vendorService.listVendors();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, allVendors },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewInactiveVendor = async (req, res) => {
  try {
    const result = await vendorService.viewInactiveVendor();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const editVendor = async (req, res) => {
  try {
    const updatedVendor = await vendorService.editVendor(
      req.params.vendorId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, updatedVendor },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const deleteVendor = async (req, res) => {
  try {
    const result = await vendorService.deleteVendor(req.params.vendorId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const Couponsaveorder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await CouponAdminService.addcouponProduct(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Coupon successfully saved.",
      "Coupon has been saved successfully."
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const couponview = async (req, res) => {
  try {
    const result = await CouponAdminService.getCoupon();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Coupons retrieved successfully.",
      "Here are the available coupons."
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
const CoupongetById = async (req, res) => {
  try {
    const result = await CouponAdminService.checkCouponById(req.params.couponId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Coupon details retrieved successfully.",
      "Coupon details are successfully retrieved."
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
const getCouponByVoucherCode = async (req, res) => {
  try {
    const result = await CouponAdminService.getCouponByVoucherCode(
      req.params.voucherCode
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Coupon retrieved successfully.",
      "Coupon successfully retrieved."
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
const updateCoupon = async (req, res) => {
  try {
    const result = await CouponAdminService.updateProduct(
      req.params.couponId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Coupon updated successfully.",
      "Coupon details have been updated."
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
const deleteCoupon = async (req, res) => {
  try {
    const result = await CouponAdminService.deleteProduct(req.params.couponId);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Coupon deleted successfully.",
      "Coupon has been successfully deleted."
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
const Customersaveorder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await CustomerAdminServices.saveCustomer(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const customerview = async (req, res) => {
  try {
    const products = await CustomerAdminServices.getallCustomer();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const CustomerupdateById = async (req, res) => {
  try {
    const result = await CustomerAdminServices.updateCustomer(
      req.params.customerId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const CustomerdeleteById = async (req, res) => {
  try {
    const result = await CustomerAdminServices.deleteCustomer(
      req.params.customerId
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const CustomergetById = async (req, res) => {
  try {
    const result = await CustomerAdminServices.getByidCustomer(
      req.params.customerId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const CustomergetByName = async (req, res) => {
  try {
    const result = await CustomerAdminServices.getByCustomerName(
      req.params.customername
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const paginateAll = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const products = await CustomerAdminServices.PaginationAll(page, pageSize);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const addtransaction = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await TransactionAdminService.addtransaction(
      req.body,
      session
    );
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewtransaction = async (req, res) => {
  try {
    const products = await TransactionAdminService.getTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const getBytransactionId = async (req, res) => {
  try {
    const result = await TransactionAdminService.getTransactionbyid(
      req.params.transactionId
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  }
};
const viewtransactionall = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const products = await TransactionAdminService.getAllTrans(page, pageSize);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const addPin = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await PinUserService.addpin(req.body, session);
    await session.commitTransaction();
    session.endSession();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewPin = async (req, res) => {
  try {
    const products = await PinUserService.get_pin(req.params.pincode);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, products },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewProd = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await productManagementService.getAllProducts(
      page,
      pageSize
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products retrieved successfully.",
      "Products retrieved successfully."
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

const viewallorders = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await orderManagementService.viewallorders(page, pageSize);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS_CODE,
        result,
      },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};

const updateorderstatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const result = await orderManagementService.updateOrderStatus(
      orderId,
      status
    );
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};

const updatepaidstatus = async (req, res) => {
  try {
    const { confirmOrderId } = req.params; 
    const { paid } = req.body;
    
    console.log(`Updating order with Confirm Order ID: ${confirmOrderId} to paid status: ${paid}`); // Logging added
    
    const result = await orderManagementService.updatePaidStatus(confirmOrderId, paid);

    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res
    );
  } catch (error) {
    console.error(error); // Add logging here
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const viewPaidOrders = async (req, res) => {
  try {
    const result = await orderManagementService.getPaidOrders();
    
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res
    );
  } catch (error) {
    console.error(error); // Add logging here
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};



const viewRequestedVendor = async (req, res) => {
  try {
    const result = await vendorService.getReqVendor();
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res,
      "Requested vendor retrieved successfully.",
      "Requested vendor retrieved successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const vendorApproved = async (req, res) => {
  try {
    const result = await vendorService.vendorApproved(req.body);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res,
      "Vendor approval status updated successfully.",
      "Vendor approval status updated successfully."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const makeVendorInactive = async (req, res) => {
  try {
    const result = await vendorService.makeVendorInactive(req.body);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res,
      "Vendor status updated to inactive successfully.",
      "The vendor's status has been updated to inactive."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const makeVendorActive = async (req, res) => {
  try {
    const result = await vendorService.makeVendorActive(req.body);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res,
      "Vendor status updated to active successfully.",
      "The vendor's status has been updated to active."
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};
const viewVendorByStatus = async (req, res) => {
  try {
    const result = await vendorService.viewVendorByStatus(req.params.status);
    return response.handleSuccessResponse(
      {
        successCode: StatusCode.SUCCESS,
        result,
      },
      res,
      "Vendors retrieved successfully.",
      `Vendors with the status "${req.params.status}" retrieved successfully.`
    );
  } catch (error) {
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      {
        errorCode: StatusCode.SERVER_ERROR,
        message: "Internal Server Error",
        error,
      },
      res
    );
  }
};

module.exports = {
  /**
   * @swagger
   * tags:
   *   - name: Banner Management
   *     description: Admin panel APIs
   * definitions:
   *   Banner:
   *     type: object
   *     properties:
   *       bannerName:
   *         type: string
   *         example: "Summer Sale Banner"
   *         required: true
   *       categoryName:
   *         type: string
   *         enum:
   *           - first hero image
   *           - second hero image
   *           - home center
   *           - flat 60% off
   *           - footer - 1
   *           - footer - 2
   *           - footer - 3
   *         example: "first hero image"
   *         required: true
   *       imageOrVideoUpload:
   *         type: string
   *         example: "https://example.com/banner1.jpg"
   *         required: true
   *       linkOrDestinationURL:
   *         type: string
   *         example: "https://example.com/destination"
   *         required: true
   *       displayStatus:
   *         type: boolean
   *         example: true
   *         default: true
   *       startDate:
   *         type: string
   *         format: date-time
   *         example: "2024-07-24T00:00:00Z"
   *         required: true
   *       endDate:
   *         type: string
   *         format: date-time
   *         example: "2024-08-24T00:00:00Z"
   *         required: true
   * /banners/add:
   *   post:
   *     summary: Add a new banner
   *     description: >
   *       Use this API to save a new banner with the specified details.
   *       The categoryName field should follow one of the specified values: first hero image, second hero image, home center, flat 60% off, footer - 1, footer - 2, footer - 3.
   *     tags:
   *       - Banner Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: banner
   *         description: Banner details to store
   *         schema:
   *           $ref: '#/definitions/Banner'
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  addBanner,
  /**
   * @swagger
   * /banners:
   *   get:
   *     summary: Get all banners
   *     description: Use this API to retrieve all banners
   *     tags:
   *       - Banner Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  listBanners,
  /**
   * @swagger
   * /banners/edit/{bannerId}:
   *   put:
   *     summary: Edit a banner by ID
   *     description: >
   *       Use this API to edit a banner by its ID.
   *       The categoryName field should follow one of the specified values:
   *       - first hero image
   *       - second hero image
   *       - home center
   *       - flat 60% off
   *       - footer - 1
   *       - footer - 2
   *       - footer - 3
   *     tags:
   *       - Banner Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: bannerId
   *         description: ID of the banner to edit
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: banner
   *         description: Updated banner details
   *         schema:
   *           $ref: '#/definitions/Banner'
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  editBanner,
  /**
   * @swagger
   * /banners/delete/{bannerId}:
   *   delete:
   *     summary: Delete a banner by ID
   *     description: Use this API to delete a banner by its ID
   *     tags:
   *       - Banner Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         schema:
   *           type: string
   *           example: "<access_token>"
   *       - in: path
   *         name: bannerId
   *         description: ID of the banner to delete
   *         required: true
   *         schema:
   *           type: string
   *           example: "KIDTRYZ-A-BANN-12345"
   *     responses:
   *       200:
   *         description: Banner deleted successfully
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
   *                   example: "Banner deleted successfully."
   *       400:
   *         description: Bad Request
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
   *                   example: "Invalid request parameters."
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorCode:
   *                   type: integer
   *                   example: 401
   *                 message:
   *                   type: string
   *                   example: "Unauthorized access."
   *       404:
   *         description: Banner Not Found
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
   *                   example: "Banner not found."
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
   *                   example: "Internal Server Error"
   */
  deleteBanner,
  /**
   * @swagger
   * /vendors/add:
   *   post:
   *     summary: Save vendor details.
   *     description: Use this API to save vendor details.
   *     tags:
   *       - Vendor Management
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *       - in: body
   *         name: vendorDetails
   *         description: The vendor has to provide details.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: "Monalisha Dash"
   *             number:
   *               type: string
   *               example: "8956326584"
   *             storeName:
   *               type: string
   *               example: "Monalisha's Store"
   *             warehouseAddress:
   *               type: string
   *               example: "BTM 2nd stage laxmi PG"
   *             bankAccountDetails:
   *               type: object
   *               properties:
   *                 accountNumber:
   *                   type: string
   *                   example: "123456789012"
   *                 IFSCCode:
   *                   type: string
   *                   example: "SBIN0001234"
   *                 bankName:
   *                   type: string
   *                   example: "State Bank of India"
   *             aadhar:
   *               type: string
   *               example: "123456789012"
   *             businessPanNumber:
   *               type: string
   *               example: "ABCDE1234F"
   *             GSTIN:
   *               type: string
   *               example: "29ABCDE1234F1Z5"
   *             email:
   *               type: string
   *               example: "mona@gmail.com"
   *     responses:
   *       200:
   *         description: Vendor details saved successfully.
   *       500:
   *         description: Internal Server Error.
   */
  addVendor,
  /**
   * @swagger
   * /get-req-vendor:
   *   get:
   *     summary: View all requested vendors.
   *     description: Retrieve a list of all vendors who have requested to join the Kidtryz platform. This endpoint allows you to view vendors who have expressed interest in becoming a part of the Kidtryz e-commerce ecosystem.
   *     tags:
   *       - Vendor Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
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
  viewRequestedVendor,
  /**
   * @swagger
   * /vendor-approve:
   *   post:
   *     summary: approve requested vendor.
   *     description: Approve a vendor who has requested to join the Kidtryz platform. This endpoint allows administrators to approve a vendor's request, enabling them to start operating within the platform. The request must include the vendor's ID in the body to specify which vendor is being approved.
   *     tags:
   *       - Vendor Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: vendor
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               required: true
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
  vendorApproved,
  /**
   * @swagger
   * /make-vendor-inactive:
   *   post:
   *     summary: Mark a vendor as inactive.
   *     description: This endpoint allows administrators to mark a vendor as inactive. The request must include the vendor's MongoDB ObjectId in the body to specify which vendor is being deactivated. This action updates the vendor's status to inactive, preventing them from operating on the Kidtryz platform.
   *     tags:
   *       - Vendor Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: vendor
   *         description: The MongoDB ObjectId of the vendor to mark as inactive.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               format: objectId
   *               description: The MongoDB ObjectId of the vendor to deactivate.
   *               example: "607d1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: Vendor status updated to inactive successfully.
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  makeVendorInactive,
  /**
   * @swagger
   * /make-vendor-active:
   *   post:
   *     summary: Mark a vendor as active.
   *     description: This endpoint allows administrators to mark a vendor as active. The request must include the vendor's MongoDB ObjectId in the body to specify which vendor is being activated. This action updates the vendor's status to active, allowing them to operate on the Kidtryz platform.
   *     tags:
   *       - Vendor Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: vendor
   *         description: The MongoDB ObjectId of the vendor to mark as active.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             id:
   *               type: string
   *               format: objectId
   *               description: The MongoDB ObjectId of the vendor to activate.
   *               example: "607d1f77bcf86cd799439011"
   *     responses:
   *       200:
   *         description: Vendor status updated to active successfully.
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal Server Error
   */
  makeVendorActive,
  /**
   * @swagger
   * /view-vendor/{status}:
   *   get:
   *     summary: View vendors by status.
   *     description: Retrieve a list of vendors filtered by their status. This endpoint allows administrators to view all vendors with a specified status (e.g., active, inactive and all). The status must be provided as a path parameter.
   *     tags:
   *       - Vendor Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: status
   *         description: The status of vendors to retrieve (e.g., active, inactive and all).
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */
  viewVendorByStatus,
  /**
   * @swagger
   * tags:
   *   - name: Category
   *     description: APIs for managing categories within the Kidtryz platform
   * definitions:
   *   Category:
   *     type: object
   *     required:
   *       - cat_name
   *       - logo
   *       - description
   *     properties:
   *       cat_name:
   *         type: string
   *         description: The name of the category.
   *       logo:
   *         type: string
   *         description: URL of the category logo image.
   *       description:
   *         type: string
   *         description: A brief description of the category.
   *       subcategories:
   *         type: array
   *         description: A list of subcategory names under the main category.
   *         items:
   *           type: string
   *     example:
   *       cat_name: "Kids' Products"
   *       logo: "http://example.com/logos/kids-products.png"
   *       description: "Category for all products designed for children."
   *       subcategories:
   *         - "Toys"
   *         - "Clothing"
   *         - "Books"
   */
  /**
   * @swagger
   * /addcategory:
   *   post:
   *     summary: Add a new category
   *     description: This API allows you to create a new category with the specified details on the Kidtryz platform. Ensure that the request includes valid authentication to proceed.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Token required for authentication. This token should be provided in the header of the request.
   *         type: string
   *         required: true
   *       - in: body
   *         name: category
   *         description: The details of the category that you want to add.
   *         schema:
   *           $ref: '#/definitions/Category'
   *     responses:
   *       200:
   *         description: The category was successfully added.
   *       400:
   *         description: Bad request. The request body may be missing required fields or contain invalid data.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   */
  addCategory,
  /**
   * @swagger
   * /viewcategory:
   *   get:
   *     summary: Retrieve all categories
   *     description: This API allows the admin to view all categories, including those that have been requested, rejected, or accepted. The response includes a list of categories with their current status and details.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the user has the necessary permissions to access the category information.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: A list of all categories with their details.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  viewCategories,
  /**
   * @swagger
   * /viewcategory_by-id/{categoryId}:
   *   get:
   *     summary: Retrieve a category by ID
   *     description: This API allows an admin to retrieve the details of a specific category using its unique ID. The response includes all relevant information about the category, including its name, logo, description, and subcategories.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the admin has the necessary permissions to access the category information.
   *         type: string
   *         required: true
   *       - in: path
   *         name: categoryId
   *         description: The unique ID of the category to retrieve. This ID is used to identify and fetch the specific category details.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The details of the requested category.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       404:
   *         description: Not Found. The category with the specified ID does not exist.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  viewCategory_categoryId,
  /**
   * @swagger
   * /category/edit/{categoryId}:
   *   put:
   *     summary: Edit a category
   *     description: This API allows an admin to update the details of a category using its unique ID. Note that only categories with an "accepted" status can be edited. Provide the updated details in the request body.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the admin has the necessary permissions to edit the category.
   *         type: string
   *         required: true
   *       - in: path
   *         name: categoryId
   *         description: The unique ID of the category to edit. This ID is used to identify the specific category to be updated.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: category
   *         description: The updated details of the category.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             cat_name:
   *               type: string
   *               description: The new name of the category.
   *               example: "Updated Kids' Toys"
   *             logo:
   *               type: string
   *               description: URL of the new category logo image.
   *               example: "http://example.com/logos/updated-kids-toys.png"
   *             description:
   *               type: string
   *               description: The new description of the category.
   *               example: "Updated category for all toys suitable for children."
   *             subcategories:
   *               type: array
   *               description: A list of new subcategory names under the main category.
   *               items:
   *                 type: string
   *               example:
   *                 - "Building Blocks"
   *                 - "Educational Toys"
   *         example:
   *           cat_name: "Updated Kids' Toys"
   *           logo: "http://example.com/logos/updated-kids-toys.png"
   *           description: "Updated category for all toys suitable for children."
   *           subcategories:
   *             - "Building Blocks"
   *             - "Educational Toys"
   *     responses:
   *       200:
   *         description: The category was successfully updated.
   *       400:
   *         description: Bad request. The request body may be missing required fields, contain invalid data, or attempt to edit a category that is not in an "accepted" status.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       404:
   *         description: Not Found. The category with the specified ID does not exist or is not in an "accepted" status.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  editCategory,
  /**
   * @swagger
   * /category/delete/{categoryId}:
   *   delete:
   *     summary: Delete a category
   *     description: This API allows an admin to delete a specific category using its unique ID. Ensure that the category ID provided is correct, as this action will permanently remove the category from the system.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the admin has the necessary permissions to perform the deletion.
   *         type: string
   *         required: true
   *       - in: path
   *         name: categoryId
   *         description: The unique ID of the category to delete. This ID is used to identify and remove the specific category.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: The category was successfully deleted.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       404:
   *         description: Not Found. The category with the specified ID does not exist.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  deleteCategory,
  /**
   * @swagger
   * /category:
   *   get:
   *     summary: Retrieve all accepted categories
   *     description: This API allows an admin to retrieve a list of all categories that are in an "accepted" status. The response includes details of these categories, including their names, logos, descriptions, and subcategories.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the admin has the necessary permissions to view the categories.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: A list of all categories with an "accepted" status.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  findStatusAccCat,
  /**
   * @swagger
   * /category-vendor-req:
   *   get:
   *     summary: View all requested categories by vendors
   *     description: This API allows an admin to retrieve a list of all categories that have been requested by vendors. The response includes details of these categories, including their names, logos, descriptions, subcategories, and the request status.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the admin has the necessary permissions to view the vendor-requested categories.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: A list of all categories requested by vendors.
   *       400:
   *         description: Bad request. The request might be missing required parameters or contain invalid data.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */

  viewReqCatByVendor,
  /**
   * @swagger
   * /category/{categoryId}:
   *   put:
   *     summary: Update category status
   *     description: This API allows an admin to update the status of a category using its unique ID. The status can be set to "accept", "reject", or "request". This is useful for managing the approval process of categories.
   *     tags:
   *       - Category
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token required for authentication. This token should be included in the header of the request to ensure that the admin has the necessary permissions to update the category status.
   *         type: string
   *         required: true
   *       - in: path
   *         name: categoryId
   *         description: The unique ID of the category to update. This ID is used to identify the specific category whose status needs to be changed.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: category
   *         description: The new status of the category.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               enum: [accept, reject, request]
   *               description: The new status for the category. Only the values "accept", "reject", or "request" are allowed.
   *               example: "accept"
   *         example:
   *           status: "accepted"
   *     responses:
   *       200:
   *         description: The status of the category was successfully updated.
   *       400:
   *         description: Bad request. The request body may be missing the status field or contain an invalid status value.
   *       401:
   *         description: Unauthorized. The request did not include a valid authentication token.
   *       404:
   *         description: Not Found. The category with the specified ID does not exist.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  upCatStatus,
  /**
   * @swagger
   * tags:
   *   - name: Admin Brand
   *     description: Admin Brand APIs for managing brand entities in the system.
   * definitions:
   *   Brand:
   *     type: object
   *     required:
   *       - title
   *       - slug
   *     properties:
   *       title:
   *         type: string
   *         description: The name or title of the brand.
   *         example: "Nike"
   *       slug:
   *         type: string
   *         description: A unique identifier for the brand, typically used in URLs.
   *         example: "nike"
   *       logo:
   *         type: string
   *         description: URL or file path of the brand's logo image.
   *         example: "https://example.com/images/nike-logo.png"
   *       featured:
   *         type: string
   *         description: Indicates whether the brand is featured or not. Can be 'true' or 'false'.
   *         example: "true"
   */
  /**
   * @swagger
   * /createBrand:
   *   post:
   *     summary: Add a new brand
   *     description: Use this API to create and add a new brand to the system. The request must include the brand details in the body and a valid authorization token in the header.
   *     tags:
   *       - Admin Brand
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication. Must be included in the request header.
   *         type: string
   *         required: true
   *         example: "YOUR_ACCESS_TOKEN"
   *       - in: body
   *         name: Brand
   *         description: The brand object to be created.
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - title
   *             - slug
   *           properties:
   *             title:
   *               type: string
   *               description: The name or title of the brand.
   *               example: "Nike"
   *             slug:
   *               type: string
   *               description: A unique identifier for the brand, typically used in URLs.
   *               example: "nike"
   *             logo:
   *               type: string
   *               description: URL or file path of the brand's logo image.
   *               example: "https://example.com/images/nike-logo.png"
   *             featured:
   *               type: string
   *               description: Indicates whether the brand is featured or not. Can be 'true' or 'false'.
   *               example: "true"
   *     responses:
   *       200:
   *         description: Brand created successfully
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The name or title of the brand.
   *             slug:
   *               type: string
   *               description: A unique identifier for the brand.
   *             logo:
   *               type: string
   *               description: URL or file path of the brand's logo image.
   *             featured:
   *               type: string
   *               description: Indicates whether the brand is featured or not.
   *         examples:
   *           application/json:
   *             title: "Nike"
   *             slug: "nike"
   *             logo: "https://example.com/images/nike-logo.png"
   *             featured: "true"
   *       400:
   *         description: Bad Request. The request was invalid or missing required parameters.
   *       401:
   *         description: Unauthorized. The request lacks valid authentication credentials.
   *       500:
   *         description: Internal Server Error. An error occurred on the server while processing the request.
   */
  addbrand,
  /**
   * @swagger
   * /getallBrand:
   *   get:
   *     summary: View all Brand
   *     description: Retrieve a list of all brands available in the system. Requires a valid authorization token in the header.
   *     tags:
   *       - Admin Brand
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Brand'
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  viewbrand,
  /**
   * @swagger
   * /updateBrand/{brandId}:
   *   put:
   *     summary: Update brand by ID
   *     description: Update the details of a specific brand identified by its ID. Requires a valid authorization token and the brand details in the request body.
   *     tags:
   *       - Admin Brand
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: brandId
   *         required: true
   *         description: ID of the brand to update
   *         schema:
   *           type: string
   *       - in: body
   *         name: brand
   *         description: Brand object to update
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Brand'
   *     responses:
   *       200:
   *         description: Brand updated successfully
   *       400:
   *         description: Invalid request body
   *       404:
   *         description: Brand not found
   */
  updatebrand,
  /**
   * @swagger
   * /updateBrandStatus/{id}:
   *   put:
   *     summary: Update brand status
   *     description: Change the status of a specific brand identified by its ID. Requires a valid authorization token and the new status in the request body.
   *     tags:
   *       - Admin Brand
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the brand to update
   *         schema:
   *           type: string
   *       - in: body
   *         name: brand
   *         description: Brand object to update
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             status:
   *               type: string
   *               description: The status of the brand
   *               enum: ["accept", "reject", "request"]
   *     responses:
   *       200:
   *         description: Brand updated successfully
   *       400:
   *         description: Invalid request body
   *       404:
   *         description: Brand not found
   */
  upBrandStatus,
  /**
   * @swagger
   * /deleteBrand/{brandId}:
   *   delete:
   *     summary: Delete a brand by ID
   *     description: Remove a brand from the system using the provided brand ID. Requires a valid authorization token.
   *     tags:
   *       - Admin Brand
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: brandId
   *         description: ID of the brand to delete
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Brand deleted successfully
   *       404:
   *         description: Brand not found
   *       500:
   *         description: Internal server error
   */
  deletebrand,
  /**
   * @swagger
   * /getBrand/{brandId}:
   *   get:
   *     summary: Get a brand by ID
   *     description: Retrieve the details of a specific brand identified by its ID. Requires a valid authorization token in the header.
   *     tags:
   *       - Admin Brand
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: brandId
   *         description: ID of the brand to retrieve
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Brand not found
   *       500:
   *         description: Internal server error
   */
  getbrandById,
  /**
   * @swagger
   * /viewRequestedBrand:
   *   get:
   *     summary: View all requested Brands
   *     description: Retrieve a list of all brands that have been requested from vendors. Requires a valid authorization token in the header.
   *     tags:
   *       - Admin Brand
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
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
  viewRequestedBrand,
  /**
   * @swagger
   * tags:
   *   - name: Admin Coupon
   *     description: APIs for managing coupons by the admin
   * definitions:
   *   Coupon:
   *     type: object
   *     properties:
   *       title:
   *         type: string
   *         description: Title of the coupon.
   *         example: "Summer Sale"
   *         required: true
   *       price:
   *         type: number
   *         description: The discount value of the coupon.
   *         example: 20
   *         required: true
   *       cappedPrice:
   *         type: number
   *         description: The maximum discount value that can be applied.
   *         example: 100
   *         required: true
   *       minSpent:
   *         type: number
   *         description: Minimum amount that must be spent to use the coupon.
   *         example: 50
   *         required: true
   *       usageLimit:
   *         type: number
   *         description: Maximum number of times the coupon can be used.
   *         example: 100
   *         required: true
   *       limitPerCustomer:
   *         type: number
   *         description: Limit of how many times a single customer can use the coupon.
   *         example: 1
   *         required: true
   *       startDate:
   *         type: string
   *         format: date-time
   *         description: Start date and time from which the coupon is valid.
   *         example: "2024-07-01T00:00:00Z"
   *         required: true
   *       endDate:
   *         type: string
   *         format: date-time
   *         description: End date and time until which the coupon is valid.
   *         example: "2024-07-31T23:59:59Z"
   *         required: true
   *       type:
   *         type: string
   *         description: Type of discount the coupon provides.
   *         enum: ['Flat Discount', 'Percentage Discount', 'Closed']
   *         example: 'Percentage Discount'
   *         required: true
   */
  /**
   * @swagger
   * /savecoupon:
   *   post:
   *     summary: Add a new coupon
   *     description: Use this API to create a new coupon with specified details. The coupon can be of different types such as 'Flat Discount', 'Percentage Discount', or 'Closed'. Ensure to provide all required fields and valid values for a successful coupon creation.
   *     tags:
   *       - Admin Coupon
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token required for authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: Coupon
   *         description: Coupon object containing all necessary details.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Coupon'
   *     responses:
   *       200:
   *         description: Coupon created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Coupon'
   *       400:
   *         description: Bad request due to invalid input or missing required fields.
   *       401:
   *         description: Unauthorized access due to invalid or missing authentication token.
   *       500:
   *         description: Internal server error indicating a failure in processing the request.
   */
  Couponsaveorder,
  /**
   * @swagger
   * /getallcoupon:
   *   get:
   *     summary: Retrieve all coupons
   *     description: Use this API endpoint to retrieve a list of all available coupons. This can be useful for viewing and managing existing coupons in the system. Ensure you have a valid access token for authentication.
   *     tags:
   *       - Admin Coupon
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token required for authentication. This token must be included in the request header to authorize access to the coupon data.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Successfully retrieved the list of all coupons.
   *       400:
   *         description: Bad request due to invalid parameters or request format.
   *       401:
   *         description: Unauthorized access due to missing or invalid authentication token.
   *       500:
   *         description: Internal server error indicating a failure in processing the request.
   */
  couponview,
  /**
   * @swagger
   * /getcouponbyid/{couponId}:
   *   get:
   *     summary: Retrieve a Coupon by ID
   *     description: Use this API to retrieve the details of a specific coupon using its unique identifier (`couponId`). This endpoint allows you to access detailed information about a coupon, such as its title, discount, and validity. Ensure you provide a valid access token for authentication.
   *     tags:
   *       - Admin Coupon
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token required for authentication. This token must be included in the request header to authorize access to the coupon details.
   *         type: string
   *         required: true
   *       - in: path
   *         name: couponId
   *         description: Unique identifier of the coupon to retrieve.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully retrieved the details of the coupon.
   *       404:
   *         description: Coupon not found with the specified `couponId`. The ID provided does not match any existing coupon.
   *       500:
   *         description: Internal server error indicating a failure in processing the request.
   */
  CoupongetById,
  /**
   * @swagger
   * /getvoucherid/{vouchercode}:
   *   get:
   *     summary: Retrieve Voucher Details
   *     description: This endpoint allows administrators to retrieve the details of a specific voucher by providing its unique voucher code. It returns the relevant information associated with the voucher.
   *     tags:
   *       - Admin Coupon
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Bearer token required for authentication to access this endpoint.
   *         type: string
   *         required: true
   *       - in: path
   *         name: vouchercode
   *         description: The unique code of the voucher to be retrieved.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully retrieved the voucher details.
   *       404:
   *         description: Voucher not found. The voucher code provided does not exist in the system.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  getCouponByVoucherCode,
  /**
   * @swagger
   * /updatecoupon/{couponId}:
   *   put:
   *     summary: Update Coupon Details
   *     description: Allows administrators to update the details of a specific coupon identified by its unique coupon ID. The request must include the updated coupon information in the request body.
   *     tags:
   *       - Admin Coupon
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Bearer token required for authentication to access this endpoint.
   *         type: string
   *         required: true
   *       - in: path
   *         name: couponId
   *         description: Unique identifier of the coupon to be updated.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: Coupon
   *         description: Object containing the updated details of the coupon.
   *         required: true
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Coupon'
   *     responses:
   *       200:
   *         description: Coupon updated successfully. The response will include the updated coupon details.
   *       400:
   *         description: Invalid request body. The provided data does not match the expected format or is incomplete.
   *       404:
   *         description: Coupon not found. The specified coupon ID does not exist in the system.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  updateCoupon,
  /**
   * @swagger
   * /deletecoupon/{couponId}:
   *   delete:
   *     summary: Delete Coupon by ID
   *     description: Allows administrators to delete a coupon using its unique coupon ID. This action will remove the specified coupon from the system.
   *     tags:
   *       - Admin Coupon
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Bearer token required for authentication to access this endpoint.
   *         type: string
   *         required: true
   *       - in: path
   *         name: couponId
   *         description: Unique identifier of the coupon to be deleted.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Successfully deleted the coupon. The response indicates that the deletion was successful.
   *       404:
   *         description: Coupon not found. The specified coupon ID does not exist in the system.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  deleteCoupon,
  //vendor
  // /**
  //  * /vendors:
  //  *   get:
  //  *     summary: Get all vendors
  //  *     description: Use this API to retrieve all vendors
  //  *     tags:
  //  *       - Vendor
  //  *     produces:
  //  *       - application/json
  //  *     parameters:
  //  *       - in: header
  //  *         name: Authorization
  //  *         description: Access token for Authentication.
  //  *         type: string
  //  *         required: true
  //  *     responses:
  //  *       200:
  //  *         description: OK
  //  *         schema:
  //  *           type: array
  //  *           items:
  //  *             type: object
  //  *             properties:
  //  *               Name:
  //  *                 type: string
  //  *               Username:
  //  *                 type: string
  //  *               Email:
  //  *                 type: string
  //  *                 format: email
  //  *               password:
  //  *                 type: string
  //  *               GST:
  //  *                 type: string
  //  * /vendors/edit/{vendorId}:
  //  *   put:
  //  *     summary: Edit a vendor
  //  *     description: Use this API to edit a vendor by its ID
  //  *     tags:
  //  *       - Vendor
  //  *     produces:
  //  *       - application/json
  //  *     parameters:
  //  *       - in: header
  //  *         name: Authorization
  //  *         description: Access token for Authentication.
  //  *         type: string
  //  *         required: true
  //  *       - in: path
  //  *         name: vendorId
  //  *         description: ID of the vendor to edit
  //  *         required: true
  //  *         schema:
  //  *           type: string
  //  *       - in: body
  //  *         name: vendor
  //  *         description: Updated vendor details
  //  *         schema:
  //  *           type: object
  //  *           properties:
  //  *             Name:
  //  *               type: string
  //  *               required: true
  //  *             Username:
  //  *               type: string
  //  *               required: true
  //  *             Email:
  //  *               type: string
  //  *               format: email
  //  *               required: true
  //  *             password:
  //  *               type: string
  //  *               required: true
  //  *             GST:
  //  *               type: string
  //  *               required: true
  //  *             status:
  //  *               type: string
  //  *               required: true
  //  *     responses:
  //  *       200:
  //  *         description: OK
  //  * /vendors/delete/{vendorId}:
  //  *   delete:
  //  *     summary: Delete a vendor
  //  *     description: Use this API to delete a vendor by its ID
  //  *     tags:
  //  *       - Vendor
  //  *     produces:
  //  *       - application/json
  //  *     parameters:
  //  *       - in: header
  //  *         name: Authorization
  //  *         description: Access token for Authentication.
  //  *         type: string
  //  *         required: true
  //  *       - in: path
  //  *         name: vendorId
  //  *         description: ID of the vendor to delete
  //  *         required: true
  //  *         schema:
  //  *           type: string
  //  *     responses:
  //  *       200:
  //  *         description: OK
  //  */

  //Coupon swagger

  // start Transaction Swagger
  /**
   * @swagger
   * tags:
   *   - name: Admin Transaction
   *     description: Transaction  APIs
   * definitions:
   *   Transaction:
   *     type: object
   *     properties:
   *       customerName:
   *         type: string
   *         required: true
   *       total:
   *         type: number
   *         required: true
   *       method:
   *         type: string
   *         required: true
   *       status:
   *         type: string
   *         required: true
   * /createTransaction:
   *   post:
   *     summary: Add Transaction
   *     description: Use this API to save a transaction
   *     tags:
   *       - Admin Transaction
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: Transaction
   *         description: Transaction object.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Transaction'
   *     responses:
   *       200:
   *         description: Transaction create Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Transaction'
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  /**
   * @swagger
   * /getalltrans:
   *    get:
   *     summary: View all Transaction
   *     description: Use this API to view Transaction
   *     tags:
   *       - Admin Transaction
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
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
  /**
   * @swagger
   * /getTransaction/{transactionId}:
   *   get:
   *     summary: Get a Transaction by ID
   *     description: Retrieves details of a Transaction from the system using the provided tr ID.
   *     tags:
   *       - Admin Transaction
   *     parameters:
   *       - in: path
   *         name: transactionId
   *         description: ID of the Transaction to retrieve
   *         required: true
   *         schema:
   *           type: string
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Brand not found
   *       500:
   *         description: Internal server error
   */
  /**
   * @swagger
   * /getPagination:
   *   get:
   *     summary: View all transaction with pagination
   *     description: Use this API to view transaction with pagination.
   *     tags:
   *       - Admin Transaction
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: query
   *         name: page
   *         description: Page number for pagination (default is 1).
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         description: Number of products per page (default is 8).
   *         schema:
   *           type: integer
   *           default: 8
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
  // Adimn Customer
  /**
   * @swagger
   * tags:
   *   - name: Admin Customer
   *     description: Admin Customer APIs
   * definitions:
   *   Customer:
   *     type: object
   *     properties:
   *       customername:
   *         type: string
   *         required: true
   *       phonenumber:
   *         type: number
   *         required: true
   */
  // save customer
  /**
   * @swagger
   * /savecustomer:
   *   post:
   *     summary: Add Customer
   *     description: Use this API to save a Customer
   *     tags:
   *       - Admin Customer
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: Customer
   *         description: Transaction object.
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Customer'
   *     responses:
   *       200:
   *         description: Customer create Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Customer'
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  // get all customer
  /**
   * @swagger
   * /getallcustomer:
   *   get:
   *     summary: View all Customer
   *     description: Use this API to view Customer
   *     tags:
   *       - Admin Customer
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
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
  // get customer by id
  /**
   * @swagger
   * /getbycustomerid/{customerId}:
   *   get:
   *     summary: Get a Customer by ID
   *     description: get that data by Customer Id
   *     tags:
   *       - Admin Customer
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: customerId
   *         description: ID of the Customerid to retrieve
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Brand not found
   *       500:
   *         description: Internal server error
   */
  // get customer by name
  /**
   * @swagger
   * /getbycustomername/{customername}:
   *   get:
   *     summary: Get a Customer by Name
   *     description: get that data by Customer Name
   *     tags:
   *       - Admin Customer
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: customername
   *         description: ID of the Customerid to retrieve
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Brand not found
   *       500:
   *         description: Internal server error
   */
  // update customer id
  /**
   * @swagger
   * /updatecustomerid/{customerId}:
   *   put:
   *     summary: Update Customer by ID
   *     description: Update details of a Customer by its ID.
   *     tags:
   *       - Admin Customer
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: customerId
   *         required: true
   *         description: ID of the customer to update
   *         schema:
   *           type: string
   *       - in: body
   *         name: Customer
   *         description: Customer object to update
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             customername:
   *               type: string
   *               description: New customer for the customer
   *             phonenumber:
   *               type: number
   *               description: New phone number for the customer
   *     responses:
   */

  addVendor,
  listVendors,
  editVendor,
  viewInactiveVendor,
  deleteVendor,
  Customersaveorder,
  customerview,
  CustomerupdateById,
  CustomerdeleteById,
  CustomergetById,
  CustomergetByName,
  paginateAll,
  addtransaction,
  viewtransaction,
  getBytransactionId,
  viewtransactionall,
  addPin,
  viewPin,
  viewallorders,
  /**
 * @swagger
 * /viewallorders:
 *   get:
 *     summary: View all confirmed orders with pagination
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Number of orders per page (default is 8)
 *     responses:
 *       200:
 *         description: Successfully retrieved the orders
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
 *                         example: KIDTRYZ-CONFIRM-ORDER-abc123
 *                       orderId:
 *                         type: string
 *                         example: KIDTRYZ-ORDER-xyz789
 *                       CustomerName:
 *                         type: string
 *                         example: John Doe
 *                       TotalAmount:
 *                         type: number
 *                         example: 200.00
 *                       Quantity:
 *                         type: number
 *                         example: 2
 *                       paid:
 *                         type: boolean
 *                         example: true
 *                       status:
 *                         type: string
 *                         example: Shipped
 *                       productDetails:
 *                         type: object
 *                         description: Product details
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-09-16T12:34:56Z
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

  updateorderstatus,

  /**
   * @swagger
   * /getAllProds:
   *   get:
   *     summary: View All Products
   *     description: Retrieve a list of all products with pagination support. This endpoint allows administrators to view products by specifying the page number and the number of products per page.
   *     tags:
   *       - Product Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Bearer token required for authentication to access this endpoint.
   *         type: string
   *         required: true
   *       - in: query
   *         name: page
   *         description: Page number for pagination. Specifies which page of products to retrieve. Default is 1.
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         description: Number of products per page. Defines how many products are shown per page. Default is 8.
   *         schema:
   *           type: integer
   *           default: 8
   *     responses:
   *       200:
   *         description: Successfully retrieved the list of products. The response includes the products for the requested page.
   *       400:
   *         description: Bad Request. The request is missing required parameters or contains invalid values.
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   */
  viewProd,
  updatepaidstatus,
 /**
 * @swagger
 * /updatepaidstatus/{confirmOrderId}:
 *   put:
 *     summary: Update the paid status of a confirmed order
 *     tags:
 *       - Orders
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: confirmOrderId
 *         description: ID of the confirmed order
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: updatePaidStatus
 *         description: Object to update the paid status of the order
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             paid:
 *               type: boolean
 *               description: The new paid status (true or false)
 *               example: true
 *     responses:
 *       200:
 *         description: Successfully updated the paid status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successCode:
 *                   type: string
 *                   example: 200
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: KIDTRYZ-CONFIRM-ORDER-abc123
 *                     orderId:
 *                       type: string
 *                       example: KIDTRYZ-ORDER-xyz789
 *                     CustomerName:
 *                       type: string
 *                       example: John Doe
 *                     TotalAmount:
 *                       type: number
 *                       example: 499.00
 *                     Quantity:
 *                       type: number
 *                       example: 1
 *                     paid:
 *                       type: boolean
 *                       example: true
 *                     status:
 *                       type: string
 *                       example: Order Placed
 *                     productDetails:
 *                       type: object
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-09-18T11:30:43.335Z
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
 viewPaidOrders,
 /**
 * @swagger
 * /viewpaidorders:
 *   get:
 *     summary: View all orders that have been marked as paid
 *     tags:
 *       - Orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved paid orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: KIDTRYZ-CONFIRM-ORDER-abc123
 *                   orderId:
 *                     type: string
 *                     example: KIDTRYZ-ORDER-xyz789
 *                   CustomerName:
 *                     type: string
 *                     example: John Doe
 *                   TotalAmount:
 *                     type: number
 *                     example: 499.00
 *                   Quantity:
 *                     type: number
 *                     example: 1
 *                   paid:
 *                     type: boolean
 *                     example: true
 *                   status:
 *                     type: string
 *                     example: Order Placed
 *                   productDetails:
 *                     type: object
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-09-18T11:30:43.335Z
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */





};
