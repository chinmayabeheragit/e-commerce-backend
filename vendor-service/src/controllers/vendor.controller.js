const productManagementService = require("../services/vendor.productManagement.service");
const attributesService = require("../services/vendor.attributes.service");
const brnadReqService = require("../services/vendor.brandReq.service");
const catReqService = require("../services/vendor.catReq.service");
const storeService = require("../services/vendor.store.service");
const withdrawalService = require("../services/vendor.withdrawal.service");
const vendorDetailsService = require("../services/vendor.profile.service");
const vendorTrackingService = require("../services/vendor.tracking.service")
const confirmorderService = require('../services/confirm.order.service')
const StatusCode = require("../../../common-libs/utils/statusCode");
const response = require("../../../common-libs/response/response");
const mongoose = require("mongoose");
const addProd = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await productManagementService.addProduct(
      req.body,
      req.vendorName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product added successfully.",
      "The product has been saved to the database successfully."
    );
  } catch (error) {
    console.log(error)
    await session.abortTransaction();
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
const viewProd = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await productManagementService.getAllProducts(
      req.vendorName,
      page,
      pageSize
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Products retrieved successfully.",
      "The list of products has been retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const viewAllProd = async (req, res) => {
  try {
    const result = await productManagementService.getProducts();
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
const updateProd = async (req, res) => {
  try {
    const result = await productManagementService.updateProd(
      req.vendorName,
      req.params.prodId,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product updated successfully.",
      "The product has been updated successfully."
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
const deleteProd = async (req, res) => {
  try {
    const result = await productManagementService.deleteProd(
      req.vendorName,
      req.params.prodId
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Product deleted successfully.",
      "The product has been deleted successfully."
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
    const result = await productManagementService.viewProdsByAge(
      req.vendorName,
      req.body
    );
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
//attributes
const addAttribute = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await attributesService.addAttribute(
      req.body,
      req.vendorName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Attribute added successfully.",
      "The attribute has been saved to the database successfully."
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
const viewAllAtri = async (req, res) => {
  try {
    const result = await attributesService.viewAll(req.vendorName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "All attributes retrieved successfully.",
      "The list of all attributes has been retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const upAttri = async (req, res) => {
  try {
    const result = await attributesService.updateAttri(
      req.params.id,
      req.body,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Attribute updated successfully.",
      "The attribute has been updated successfully."
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
const delAttri = async (req, res) => {
  try {
    const result = await attributesService.deleteAttri(
      req.params.id,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Attribute deleted successfully.",
      "The attribute has been deleted successfully."
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
const addReqBrand = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await brnadReqService.addReqBrand(
      req.body,
      req.vendorName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand request added successfully.",
      "The brand request has been added successfully."
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
const getReqBrand = async (req, res) => {
  try {
    const result = await brnadReqService.getReqBrand(req.vendorName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Requested brand retrieved successfully.",
      "The requested brand has been retrieved successfully."
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
const upReqBrand = async (req, res) => {
  try {
    const result = await brnadReqService.upReqBrand(
      req.params.id,
      req.body,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand request updated successfully.",
      "The brand request has been updated successfully."
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
const delReqBrand = async (req, res) => {
  try {
    const result = await brnadReqService.delReqBrand(
      req.params.id,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Brand request deleted successfully.",
      "The brand request has been deleted successfully."
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
const viewAcceptBrands = async (req, res) => {
  try {
    const result = await brnadReqService.viewAcceptBrands();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Accepted brands retrieved successfully.",
      "The list of accepted brands has been retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const addReqCat = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await catReqService.addReqCat(
      req.body,
      req.vendorName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category request added successfully.",
      "The category request has been saved to the database successfully."
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
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const getReqCat = async (req, res) => {
  try {
    const result = await catReqService.getReqCat(req.vendorName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Requested category retrieved successfully.",
      "The requested category has been retrieved successfully."
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
const upReqCat = async (req, res) => {
  try {
    const result = await catReqService.upReqCat(
      req.params.id,
      req.body,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category request updated successfully.",
      "The category request has been updated successfully."
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
const delReqCat = async (req, res) => {
  try {
    const result = await catReqService.delReqCat(req.vendorName, req.params.id);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Category request deleted successfully.",
      "The category request has been deleted successfully."
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
    const result = await catReqService.findStatusAccCat();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Accepted category statuses retrieved successfully.",
      "The statuses of accepted categories have been retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const saveStore = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await storeService.saveStore(
      req.body,
      req.vendorName,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Store saved successfully.",
      "The store has been saved to the database successfully."
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res,
      error
    );
  } finally {
    session.endSession();
  }
};
const upStore = async (req, res) => {
  try {
    const result = await storeService.upStore(
      req.vendorName,
      req.params.id,
      req.body
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Store updated successfully.",
      "The store has been updated successfully."
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
const gatStore = async (req, res) => {
  try {
    const result = await storeService.getStore();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Store retrieved successfully.",
      "The store has been retrieved successfully."
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const saveAccount = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await withdrawalService.saveAccount(
      req.vendorName,
      req.body,
      session
    );
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Account saved successfully.",
      "The account has been saved successfully."
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
const upAccount = async (req, res) => {
  try {
    const result = await withdrawalService.upAccount(
      req.params.id,
      req.body,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Account updated successfully.",
      "The account has been updated successfully."
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
const delAccount = async (req, res) => {
  try {
    const result = await withdrawalService.delAccount(
      req.params.id,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Account deleted successfully.",
      "The account has been deleted successfully."
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
const viewAllAccounts = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await withdrawalService.viewAll(
      page,
      pageSize,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Accounts retrieved successfully.",
      "All accounts have been retrieved successfully."
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
const viewAccount = async (req, res) => {
  try {
    const result = await withdrawalService.viewAccount(
      req.params.id,
      req.vendorName
    );
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Account retrieved successfully.",
      "The account has been retrieved successfully."
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
const getVendorProfile = async (req, res) => {
  try {
    const result = await vendorDetailsService.getVendorProfile(req.vendorName);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
       "Vendor profile retrieved successfully.",
      "The profile of vendor has been retrieved successfully."
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

const generateAwb = async (req, res) => {
  try {
    const { type, count } = req.body;
    if (!type || !count) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.BAD_REQUEST,
          message: "Type and count parameters are required.",
        },
        res
      );
    }

    const awbNumber = await vendorTrackingService.generateAwb(type, count);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, awbNumber },
      res,
      "AWB number fetched successfully",
      "AWB number fetched successfully"
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal server error" },
      res
    );
  }
};
const viewPaidOrdersByVendor = async (req, res) => {
  try {
    const vendorEmail = req.vendorName; // Extract vendor email from decoded token
    const result = await confirmorderService.viewPaidOrdersByVendor(vendorEmail);

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



const updateOrderStatus = async (req, res) => {
  try {
    const { confirmOrderId } = req.params;
    const { status } = req.body;

    const result = await confirmorderService.updateOrderStatus(confirmOrderId, status);

    if (result.error) {
      return response.handleErrorResponse(
        {
          errorCode: StatusCode.BAD_REQUEST,
          message: result.error,
        },
        res
      );
    }

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

const addAwbToConfirmOrder = async (req, res) => {
  try {
    const {confirmOrderId} = req.headers;  // Get confirm order ID from header
    const vendorName = req.userName;  // JWT token extraction logic already exists in your middleware
    const { awbNumber } = req.body;  // Get AWB number from request body

    const result = await confirmorderService.addAwbToConfirmOrder(confirmOrderId, awbNumber, vendorName);

    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "AWB number added successfully.",
      "The AWB number has been added to the order."
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
/**
 * @swagger
 * tags:
 *   name: Product Management
 *   description: APIs for managing products
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *       brand:
 *         type: string
 *       category:
 *         type: string
 *         required: true
 *       subCategory:
 *         type: array
 *         items:
 *           type: string
 *       age:
 *         type: string
 *         enum: ['0-6', '6-12', '12-18', '18-24', '24+']
 *         description: |
 *           Specifies the age range. Choose from: 0-6, 6-12, 12-18, 18-24, or 24+.
 *       description:
 *         type: string
 *         required: true
 *       regularPrice:
 *         type: number
 *         required: true
 *       discountPercentage:
 *         type: number
 *       kidztryzCoins:
 *         type: number
 *       productType:
 *         type: string
 *       stockStatus:
 *         type: string
 *         enum: ['In Stock', 'Out of Stock', 'Limited Stock']
 *       quantityInStock:
 *         type: number
 *         required: true
 *       images:
 *         type: array
 *         items:
 *           type: string
 *         required: true
 *       attribute:
 *         type: string
 *       subAttributes:
 *         type: array
 *         items:
 *           type: string
 *       size:
 *         type: string
 *         enum: ['S', 'M', 'L', 'XL', 'XXL']
 *       weight:
 *         type: string
 * /vendor-add-prod:
 *   post:
 *     summary: Add a new product
 *     description: Use this API to add a new product
 *     tags:
 *       - Product Management
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token for authentication.
 *         type: string
 *         required: true
 *       - in: body
 *         name: product
 *         description: Product details to store
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Success. Product added successfully.
 *       400:
 *         description: Bad Request. Invalid product details.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal Server Error. Failed to add the product.
 */

  addProd,
  /**
   * @swagger
   * tags:
   *   name: Product Management
   *   description: Product service APIs
   * /vendor-view-prod:
   *   get:
   *     summary: Retrieve Products for a Specific Vendor with Pagination
   *     description: |
   *       This API allows vendors to view their own products with pagination. The vendor can see all products they have added to the platform, but cannot view products from other vendors.
   *       The API supports pagination to help manage large sets of product data efficiently.
   *     tags:
   *       - Product Management
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
  viewProd,
  /**
   * @swagger
   * tags:
   *   name: Vendor services
   *   description: Vendor service APIs
   * /vendor-view-all-prod:
   *   get:
   *     summary: View all products
   *     description: |
   *       This API allows vendors to view a complete list of all products available on the platform.
   *       Vendors can see products from all vendors, not just their own. This can be useful for comparing products or understanding market trends.
   *     tags:
   *       - Product Management
   *     responses:
   *       200:
   *         description: Success
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal server error
   */
  viewAllProd,
  /**
   * @swagger
   * tags:
   *   name: Product Management
   *   description: APIs for managing products
   *
   * /vendor-update-prod/{productId}:
   *   put:
   *     summary: Update a product
   *     description: |
   *       This API allows vendors to update the details of an existing product by specifying the product ID.
   *       Vendors can modify various attributes of the product, such as name, description, pricing, stock status, and more.
   *       Ensure that the product ID provided in the path corresponds to a valid product that the vendor owns.
   *     tags:
   *       - Product Management
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
   *       - in: path
   *         name: productId
   *         description: ID of the product to update
   *         type: string
   *         required: true
   *       - in: body
   *         name: product
   *         description: Updated Product Details
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               example: Magic Castle Playset
   *             brand:
   *               type: string
   *               example: WonderToys
   *             category:
   *               type: string
   *               example: Toys
   *             subCategory:
   *               type: array
   *               items:
   *                 type: string
   *               example: ["Playsets", "Castle Toys", "Interactive Toys"]
   *             age:
   *               type: string
   *               example: 0-6
   *             description:
   *               type: string
   *               example: A colorful and interactive magic castle playset with lights, sounds, and movable parts.
   *             regularPrice:
   *               type: number
   *               example: 49.99
   *             discountPercentage:
   *               type: number
   *               example: 15
   *             kidztryzCoins:
   *               type: number
   *               example: 100
   *             dateAdded:
   *               type: string
   *               format: date-time
   *             productType:
   *               type: string
   *               example: Playset
   *             stockStatus:
   *               type: string
   *               example: In Stock
   *             quantityInStock:
   *               type: number
   *               example: 150
   *             alreadySold:
   *               type: number
   *               example: 45
   *             images:
   *               type: array
   *               items:
   *                 type: string
   *               example: ["https://example.com/images/magic-castle-front.jpg", "https://example.com/images/magic-castle-side.jpg"]
   *             video:
   *               type: string
   *               example: "https://example.com"
   *             attribute:
   *               type: string
   *               example: Interactive with Lights and Sounds
   *             subAttributes:
   *               type: array
   *               items:
   *                 type: string
   *               example: ["Movable Parts", "Battery Operated", "Safe for Ages 3+"]
   *             size:
   *               type: string
   *               example: L
   *             weight:
   *               type: string
   *               example: 1.5kg
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
  updateProd,
  /**
   * @swagger
   * tags:
   *   name: Vendor services
   *   description: Vendor service APIs
   *
   * /vendor-delete-prod/{productId}:
   *   delete:
   *     summary: Delete a product
   *     description: |
   *       This API allows vendors to delete an existing product from their catalog. Vendors need to specify the product ID of the product they wish to delete.
   *       Deleting a product will remove all associated details from the system, and this action cannot be undone. It is important to ensure that the product ID provided is correct and that the vendor has the necessary permissions to perform this action.
   *       This endpoint requires authentication to ensure that only authorized vendors can delete products.
   *     tags:
   *       - Product Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: productId
   *         description: ID of the product to delete
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
  deleteProd,
  /**
   * @swagger
   * /view-products-ages:
   *   post:
   *     summary: View products by age
   *     description: |
   *       This API allows users to retrieve a list of products that are suitable for a specified age range.
   *       The age range should be provided in the request body as a string. The API filters products based on this
   *       age range to help users find appropriate items for different age groups.
   *       Ensure that the age range provided matches one of the predefined values: '0-6', '6-12', '12-18', '18-24', or '24+'.
   *       The request must include a valid access token for authentication.
   *     tags:
   *       - Product Management
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
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
  /**
   * @swagger
   *
   * /vendor-attributes/add:
   *   post:
   *     summary: Add a new attribute
   *     description: This API allows vendors to add new attributes, such as color, size, etc., to their product catalog. The attribute is specified by a title and a set of possible values.
   *     tags:
   *       - Vendor Attributes
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
   *         name: attribute
   *         description: The attribute object to add
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The title of the attribute
   *               example: Color
   *             value:
   *               type: array
   *               items:
   *                 type: string
   *               description: The value(s) of the attribute
   *               example: ["Blue", "Red", "Green"]
   *     responses:
   *       200:
   *         description: Successful response indicating the addition
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  addAttribute,
  /**
   * @swagger
   * /vendor-attributes:
   *   get:
   *     summary: View all attributes
   *     description: This API allows vendors to retrieve a list of all attributes they have defined for their products. Attributes can include characteristics like color, size, material, etc.
   *     tags:
   *       - Vendor Attributes
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
   *     responses:
   *       200:
   *         description: Successful response containing all attributes
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  viewAllAtri,
  /**
   * @swagger
   * /vendor-attributes/{id}:
   *   put:
   *     summary: Update a vendor attribute by ID
   *     description: This API allows vendors to update an existing attribute by its ID. Vendors can modify the title and values of their own attributes.
   *     tags:
   *       - Vendor Attributes
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
   *       - in: path
   *         name: id
   *         description: ID of the attribute to update
   *         type: string
   *         required: true
   *       - in: body
   *         name: attribute
   *         description: The updated attribute object
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The updated title of the attribute
   *               example: New Color
   *             value:
   *               type: array  # Changed to array type
   *               items:
   *                 type: string
   *               description: The updated value(s) of the attribute
   *               example: ["Red", "Blue"]
   *     responses:
   *       200:
   *         description: Successful response indicating the update
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Attribute not found
   *       500:
   *         description: Internal server error
   */
  upAttri,
  /**
   * @swagger
   * /vendor-attributes/{id}:
   *   delete:
   *     summary: Delete a vendor attribute by ID
   *     description: This API allows vendors to delete an existing attribute by its ID. Vendors can remove attributes that are no longer needed for their products.
   *     tags:
   *       - Vendor Attributes
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
   *       - in: path
   *         name: id
   *         description: ID of the attribute to delete
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Successful response indicating the deletion
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       404:
   *         description: Attribute not found
   *       500:
   *         description: Internal server error
   */
  delAttri,
  /**
   * @swagger
   * /vendor-brand-req:
   *   post:
   *     summary: Request to add a brand
   *     description: This API allows vendors to send a request to add a new brand to the platform. The request includes details such as the brand title, unique slug, logo, and whether the brand is featured.
   *     tags:
   *       - Brand Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *       - in: body
   *         name: brandDetails
   *         description: Details of the brand to be added
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The title of the brand.
   *               example: Nike
   *             slug:
   *               type: string
   *               description: Unique slug for the brand.
   *               example: nike
   *             logo:
   *               type: string
   *               description: URL or file path of the brand's logo.
   *               example: https://example.com/logos/nike.png
   *             featured:
   *               type: string
   *               description: Indicates whether the brand is featured.
   *               example: yes
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
  addReqBrand,
  /**
   * @swagger
   * /vendor-brand-req:
   *   get:
   *     summary: Get requested brands
   *     description: Use this API to retrieve the list of brands requested by the vendor. The API returns an array of brand requests including their details.
   *     tags:
   *       - Brand Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  getReqBrand,
  /**
   * @swagger
   * /vendor-brand-req/{id}:
   *   put:
   *     summary: Update requested brand
   *     description: Use this API to update the details of a requested brand by its ID.
   *     tags:
   *       - Brand Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the requested brand to update.
   *       - in: body
   *         name: body
   *         required: true
   *         description: The data to update the requested brand with.
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               example: "New Brand Title"
   *             slug:
   *               type: string
   *               example: "new-brand-title"
   *             logo:
   *               type: string
   *               example: "https://example.com/logo.png"
   *             featured:
   *               type: string
   *               example: yes
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  upReqBrand,
  /**
   * @swagger
   * /vendor-brand-req/{id}:
   *   delete:
   *     summary: Delete requested brand
   *     description: Use this API to delete a requested brand.
   *     tags:
   *       - Brand Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the requested brand to delete.
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  delReqBrand,
  /**
   * @swagger
   * /vendor-brand:
   *   get:
   *     summary: Get all applicable brands
   *     description: Use this API to retrieve requested brands.
   *     tags:
   *       - Brand Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  viewAcceptBrands,
  /**
   * @swagger
   * /vendor-cat-req:
   *   post:
   *     summary: Request to add a category
   *     description: Use this API to send a request to the admin for adding a new category to the vendor's product listings. The vendor provides details about the category they wish to add, including the category name, subcategories, description, and logo.
   *     tags:
   *       - Category Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: categoryDetails
   *         description: Details of the category to be added
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             cat_name:
   *               type: string
   *               description: The name of the category.
   *               example: Kids Toys
   *             subcategories:
   *               type: array
   *               items:
   *                 type: string
   *               description: Array of subcategories.
   *               example: ["Action Figures", "Educational Toys", "Stuffed Animals", "Puzzles", "Board Games"]
   *             description:
   *               type: string
   *               description: Description of the category.
   *               example: A wide range of toys and games for children of all ages
   *             logo:
   *               type: string
   *               description: URL or file path of the category's logo.
   *               example: https://example.com/logos/kids-toys.png
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
  addReqCat,
  /**
   * @swagger
   * /vendor-cat-req:
   *   get:
   *     summary: Get requested categories
   *     description: Use this API to retrieve all categories that have been requested by the vendor. This endpoint allows vendors to view the list of their submitted category requests, including details such as category name, subcategories, description, and the status of each request.
   *     tags:
   *       - Category Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  getReqCat,
  /**
   * @swagger
   * /vendor-cat-req/{id}:
   *   put:
   *     summary: Update requested category
   *     description: Use this API to update the details of a category, whether it is a requested category or an existing one. Vendors can modify information such as the category name, subcategories, description, and logo of a category they have previously requested or already exists.
   *     tags:
   *       - Category Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the category to update.
   *       - in: body
   *         name: body
   *         required: true
   *         description: The data to update the category with.
   *         schema:
   *           type: object
   *           properties:
   *             cat_name:
   *               type: string
   *               description: The name of the category.
   *               example: Kids Toys
   *             subcategories:
   *               type: array
   *               items:
   *                 type: string
   *               description: Array of subcategories.
   *               example: ["Action Figures", "Educational Toys", "Stuffed Animals", "Puzzles", "Board Games"]
   *             description:
   *               type: string
   *               description: Description of the category.
   *               example: A wide range of toys and games for children of all ages
   *             logo:
   *               type: string
   *               description: URL or file path of the category's logo.
   *               example: https://example.com/logos/kids-toys.png
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
   *         description: Internal server error
   */
  upReqCat,
  /**
   * @swagger
   * /vendor-cat-req/{id}:
   *   delete:
   *     summary: Delete requested category
   *     description: Use this API to delete a category that the vendor has previously requested. Vendors can remove their own category requests if they no longer wish to have that category added to their product listings.
   *     tags:
   *       - Category Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the requested category to delete.
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  delReqCat,
  /**
   * @swagger
   * /vendor-cat:
   *   get:
   *     summary: Get applicable categories
   *     description: Use this API to retrieve a list of all categories that are applicable to the vendor's products. This includes categories that have been approved and are available for the vendor to use.
   *     tags:
   *       - Category Request
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Internal server error
   */
  findStatusAccCat,
  /**
   * @swagger
   * /vendor-store:
   *   post:
   *     summary: Save store details
   *     description: This endpoint allows a vendor to save their store details, including the store's logo, name, GST number, and meta description.
   *     tags:
   *       - Store
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: body
   *         name: storeDetails
   *         description: The details of the store to be saved.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             storeLogo:
   *               type: string
   *               description: The logo of the store.
   *               example: "https://example.com/logo.png"
   *             storeName:
   *               type: string
   *               description: The name of the store.
   *               example: "Awesome Store"
   *             GSTNumber:
   *               type: string
   *               description: GST Number of the store.
   *               example: "22AAAAA0000A1Z5"
   *             metaDescription:
   *               type: string
   *               description: Meta description of the store.
   *               example: "The best store for awesome products."
   *     responses:
   *       200:
   *         description: Successfully saved the store details.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Store details saved successfully."
   *       400:
   *         description: Bad Request - Invalid or missing parameters.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid store details provided."
   *       401:
   *         description: Unauthorized - Invalid or missing access token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Unauthorized access."
   *       500:
   *         description: Internal Server Error - An error occurred while processing the request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "An error occurred while saving the store details."
   */
  saveStore,
  /**
   * @swagger
   * /vendor-store/{id}:
   *   put:
   *     summary: Update store details by ID
   *     description: This endpoint allows a vendor to update their store details by providing the store ID and the new details.
   *     tags:
   *       - Store
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         description: ID of the store to update.
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: storeDetails
   *         description: The new details of the store to be updated.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             storeLogo:
   *               type: string
   *               description: The logo of the store.
   *               example: "https://example.com/new-logo.png"
   *             storeName:
   *               type: string
   *               description: The name of the store.
   *               example: "New Awesome Store"
   *             GSTNumber:
   *               type: string
   *               description: GST Number of the store.
   *               example: "22BBBBB0000B2Z6"
   *             metaDescription:
   *               type: string
   *               description: Meta description of the store.
   *               example: "The best store for amazing new products."
   *     responses:
   *       200:
   *         description: Successfully updated the store details.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Store details updated successfully."
   *       400:
   *         description: Bad Request - Invalid or missing parameters.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid store details provided."
   *       401:
   *         description: Unauthorized - Invalid or missing access token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Unauthorized access."
   *       500:
   *         description: Internal Server Error - An error occurred while processing the request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "An error occurred while updating the store details."
   */
  upStore,
  /**
   * @swagger
   * /vendor-store:
   *   get:
   *     summary: Get all store details
   *     description: Endpoint to retrieve all store details.
   *     tags:
   *       - Store
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: Success
   *       401:
   *         description: Unauthorized
   *       500:
   *         description: Internal server error
   */
  gatStore,
  /**
   * @swagger
   * /vendor-withdrawal:
   *   post:
   *     summary: Save account details
   *     description: Endpoint to save the account details of a vendor. This information is used for processing withdrawals.
   *     tags:
   *       - Account
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: token for authentication.
   *         type: string
   *         required: true
   *         example: your_access_token
   *       - in: body
   *         name: accountDetails
   *         description: The details of the account to be saved.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The title of the account, such as "Business Account" or "Personal Account".
   *               example: "Business Account"
   *             name:
   *               type: string
   *               description: The name associated with the account.
   *               example: "John Doe"
   *             bankName:
   *               type: string
   *               description: The name of the bank.
   *               example: "ABC Bank"
   *             accountNumber:
   *               type: string
   *               description: The account number.
   *               example: "1234567890"
   *             IFSCCode:
   *               type: string
   *               description: The IFSC code of the bank.
   *               example: "SBIN0001234"
   *             branchName:
   *               type: string
   *               description: The branch name of the bank.
   *               example: "MG Road Branch"
   *             default:
   *               type: string
   *               description: Optional field indicating if this is the default account. Accepts "true" or "false".
   *               example: "true"
   *     responses:
   *       200:
   *         description: Account details saved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Account details saved successfully."
   *       400:
   *         description: Bad Request. The input parameters are invalid.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid input parameters."
   *       401:
   *         description: Unauthorized. Missing or invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Unauthorized."
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "An internal server error occurred."
   */
  saveAccount,
  /**
   * @swagger
   * /vendor-withdrawal/{id}:
   *   put:
   *     summary: Update account details by ID
   *     description: Endpoint for vendors to update the details of one of their own accounts using the account ID. This allows vendors to modify information such as the account title, name, bank details, and whether the account is the default one.
   *     tags:
   *       - Account
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         type: string
   *         required: true
   *         example: "your_access_token"
   *       - in: path
   *         name: id
   *         description: The ID of the account to update. The ID must be a valid MongoDB ObjectId.
   *         required: true
   *         schema:
   *           type: string
   *           example: "60c72b2f5f1b2c001cf5a3b2"
   *       - in: body
   *         name: accountDetails
   *         description: The details of the account to be updated. Provide the fields that need to be updated. Fields not included in the request will remain unchanged.
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             title:
   *               type: string
   *               description: The title of the account.
   *               example: "Business Account"
   *             name:
   *               type: string
   *               description: The name associated with the account.
   *               example: "John Doe"
   *             branchName:
   *               type: string
   *               description: The branch name of the bank.
   *               example: "MG Road Branch"
   *             default:
   *               type: string
   *               description: Optional field indicating if it's a default account. Set to `true` if this account should be marked as default.
   *               example: yes
   *     responses:
   *       200:
   *         description: Account details updated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Account details updated successfully."
   *       400:
   *         description: Bad Request. The provided data is invalid or the request is missing required fields.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid data format or missing fields."
   *       401:
   *         description: Unauthorized. Missing or invalid access token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Unauthorized."
   *       404:
   *         description: Not Found. The account with the specified ID does not exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Account not found."
   *       500:
   *         description: Internal server error. An unexpected error occurred while processing the request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "An internal server error occurred."
   */
  upAccount,
  /**
   * @swagger
   * /vendor-withdrawal/{id}:
   *   delete:
   *     summary: Delete account by ID
   *     description: Endpoint for vendors to delete one of their own accounts using the account ID. Only the owner of the account can perform this action.
   *     tags:
   *       - Account
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: path
   *         name: id
   *         description: ID of the account to delete.
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
   *       500:
   *         description: Internal server error
   */
  delAccount,
  /**
   * @swagger
   * /vendor-withdrawal:
   *   get:
   *     summary: View all accounts
   *     description: Endpoint for vendors to view all their account details, with optional pagination.
   *     tags:
   *       - Account
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for Authentication.
   *         type: string
   *         required: true
   *       - in: query
   *         name: page
   *         description: Page number for pagination.
   *         type: integer
   *         required: false
   *       - in: query
   *         name: pageSize
   *         description: Number of accounts per page.
   *         type: integer
   *         required: false
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
  viewAllAccounts,
  /**
   * @swagger
   * /vendor-withdrawal-each/{id}:
   *   get:
   *     summary: View account details by ID
   *     description: Endpoint to view the account details of a vendor by their account ID.
   *     tags:
   *       - Account
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         type: string
   *         required: true
   *         example: your_access_token
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the account to view.
   *         example: 60c72b2f5f1b2c001cf5a3b2
   *     responses:
   *       200:
   *         description: Account details retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   example: "60c72b2f5f1b2c001cf5a3b2"
   *                 title:
   *                   type: string
   *                   example: "Business Account"
   *                 name:
   *                   type: string
   *                   example: "John Doe"
   *                 bankName:
   *                   type: string
   *                   example: "ABC Bank"
   *                 accountNumber:
   *                   type: string
   *                   example: "1234567890"
   *                 IFSCCode:
   *                   type: string
   *                   example: "SBIN0001234"
   *                 branchName:
   *                   type: string
   *                   example: "MG Road Branch"
   *                 default:
   *                   type: string
   *                   example: "true"
   *       400:
   *         description: Bad Request. Invalid input parameters.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid account ID."
   *       401:
   *         description: Unauthorized. Missing or invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Unauthorized."
   *       404:
   *         description: Account not found. No account exists with the given ID.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Account not found."
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "An internal server error occurred."
   */
  viewAccount,
  /**
   * @swagger
   * /vendor-profile:
   *   get:
   *     summary: Retrieve vendor profile details
   *     description: Endpoint to retrieve the profile details of the currently authenticated vendor.
   *     tags:
   *       - Vendor
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         schema:
   *           type: string
   *           example: your_access_token
   *     responses:
   *       200:
   *         description: Vendor profile retrieved successfully.
   *       400:
   *         description: Bad Request. Invalid input parameters.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Invalid vendor profile request."
   *       401:
   *         description: Unauthorized. Missing or invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Unauthorized. Invalid or missing access token."
   *       404:
   *         description: Vendor profile not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Vendor profile not found."
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "An internal server error occurred."
   */
  getVendorProfile,
  /**
 * @swagger
 * /generate-awb:
 *   post:
 *     summary: Generate AWB Number
 *     description: Generates a new AWB number using the Ecom Express API.
 *     tags:
 *       - Tracking Management
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         description: Request body for generating AWB number
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - type
 *             - count
 *           properties:
 *             type:
 *               type: string
 *               description: The type of shipment (e.g., EXPP for Express Plus).
 *               example: EXPP
 *             count:
 *               type: integer
 *               description: The number of AWBs to be fetched.
 *               example: 1
 *     responses:
 *       200:
 *         description: AWB number generated successfully
 *         schema:
 *           type: object
 *           properties:
 *             successCode:
 *               type: integer
 *               example: 200
 *             awbNumber:
 *               type: string
 *               example: '1234567890'
 *             message:
 *               type: string
 *               example: 'AWB number fetched successfully'
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           properties:
 *             errorCode:
 *               type: integer
 *               example: 400
 *             message:
 *               type: string
 *               example: 'Type and count parameters are required.'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           type: object
 *           properties:
 *             errorCode:
 *               type: integer
 *               example: 500
 *             message:
 *               type: string
 *               example: 'AWB number generation failed'
 */
  generateAwb,
  updateOrderStatus,
/**
 * @swagger
 * paths:
 *   /update-status/{confirmOrderId}:
 *     put:
 *       tags:
 *         - Orders
 *       summary: Update order status by confirmation order ID
 *       description: This API allows vendors to update the status of a confirmed order.
 *       operationId: updateOrderStatus
 *       parameters:
 *         - in: path
 *           name: confirmOrderId
 *           required: true
 *           description: The ID of the confirmed order to update.
 *           schema:
 *             type: string
 *           example: "KIDTRYZ-CONFIRM-ORDER-i8SvhJ3K-"
 *         - in: header
 *           name: Authorization
 *           description: Access token for authentication.
 *           required: true
 *           schema:
 *             type: string
 *             example: "your_access_token"
 *         - in: body
 *           name: statusUpdate
 *           description: The new status to update the order.
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the order.
 *                 enum:
 *                   - Order Placed
 *                   - Processing
 *                   - Shipped
 *                   - Out for Delivery
 *                   - Delivered
 *                   - Cancelled
 *                   - Returned
 *                 example: "Shipped"
 *       responses:
 *         200:
 *           description: Order status updated successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: "Order status updated successfully"
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "KIDTRYZ-CONFIRM-ORDER-i8SvhJ3K-"
 *                       orderId:
 *                         type: string
 *                         example: "KIDTRYZ-ORDER-ENQ-gBsl2l570"
 *                       CustomerName:
 *                         type: string
 *                         example: "Johny Doe"
 *                       TotalAmount:
 *                         type: number
 *                         example: 230
 *                       Quantity:
 *                         type: number
 *                         example: 3
 *                       paid:
 *                         type: boolean
 *                         example: true
 *                       status:
 *                         type: string
 *                         example: "Shipped"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-06T10:18:09.460Z"
 *         400:
 *           description: Bad request due to invalid data or conditions.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Cannot update status of a completed or cancelled order"
 *         404:
 *           description: Confirmed order not found.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Confirm order not found"
 *         500:
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: "Internal Server Error"
 */




  viewPaidOrdersByVendor,
  /**
 * @swagger
 * /viewpaidorders:
 *   get:
 *     summary: View all paid orders by vendor email
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token for authentication
 *         required: true
 *         schema:
 *           type: string
 *           example: your_access_token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved the paid orders
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
 *                         example: 499.00
 *                       Quantity:
 *                         type: number
 *                         example: 1
 *                       paid:
 *                         type: boolean
 *                         example: true
 *                       status:
 *                         type: string
 *                         example: Order Placed
 *                       productDetails:
 *                         type: object
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-09-18T11:30:43.335Z
 *       404:
 *         description: No paid orders found for the vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorCode:
 *                   type: string
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: No paid orders found for this vendor.
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
  addAwbToConfirmOrder,
 /**
 * @swagger
 * /addAwbToOrder:
 *   put:
 *     summary: Add AWB number to a confirmed order.
 *     description: Adds an AWB number to a specific confirmed order identified by the confirm order ID in the header.
 *     tags:
 *       - Confirm Order
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT access token for vendor authentication.
 *         required: true
 *         type: string
 *         example: Bearer your_access_token
 *       - in: header
 *         name: confirmOrderId
 *         description: The ID of the confirmed order to update.
 *         required: true
 *         type: string
 *         example: "KIDTRYZ-CONFIRM-ORDER-i8SvhJ3K-"
 *       - in: body
 *         name: body
 *         description: JSON object containing the AWB number.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             awbNumber:
 *               type: string
 *               example: AWB123456789
 *               description: The AWB number to be added to the confirmed order.
 *     responses:
 *       200:
 *         description: AWB number added successfully.
 *         schema:
 *           type: object
 *           properties:
 *             successCode:
 *               type: string
 *               example: 200
 *             result:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: KIDTRYZ-CONFIRM-ORDER-jNFGt45x
 *                 awbNumber:
 *                   type: string
 *                   example: AWB123456789
 *                 message:
 *                   type: string
 *                   example: AWB number added to the order.
 *       400:
 *         description: Bad request, AWB number is required.
 *       401:
 *         description: Unauthorized, token is missing or invalid.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */



};
