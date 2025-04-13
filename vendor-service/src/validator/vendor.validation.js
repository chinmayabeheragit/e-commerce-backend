const Joi = require("joi");
const response = require("../../../common-libs/response/response");
const statusCode = require("../../../common-libs/utils/statusCode");  

const validateRequest = async (schema, req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: error,
        displayMessage: { error: error.details[0].message },
      },
      res
    );
  }
};
const schemas = {
  product: Joi.object({
    name: Joi.string().required(),
    brand: Joi.string(),
    category: Joi.string(),
    subCategory: Joi.array().items(Joi.string()),
    age: Joi.string(),
    description: Joi.string().required(),
    regularPrice: Joi.number().positive().required(),
    discountPercentage: Joi.number().integer().min(1).max(70).required(),
    kidztryzCoins: Joi.number().integer().min(0).required(),
    dateAdded: Joi.string().isoDate(),
    productType: Joi.string().required(),
    stockStatus: Joi.string().required(),
    quantityInStock: Joi.number().integer().min(0).required(),
    images: Joi.array().items(Joi.string()).required(),
    video: Joi.string(),
    attribute: Joi.string(),
    subAttributes: Joi.array().items(Joi.string()),
    size: Joi.string(),
    weight: Joi.string(),
  }),
  attribute: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    value: Joi.array().items(Joi.string()).required(),
  }),
  category: Joi.object({
    catName: Joi.string().required().label("Category Name"),
    desc: Joi.string().required().label("Description"),
  }),

  discount: Joi.object({
    discountName: Joi.string().required().label("Discount Name"),
    discountPercentage: Joi.number()
      .min(0)
      .max(100)
      .label("Discount Percentage"),
    discountAmount: Joi.number().min(0).label("Discount Amount"),
    applicableProducts: Joi.array()
      .items(Joi.string())
      .label("Applicable Products"),
    startDate: Joi.string().isoDate().required().label("Start Date"),
    endDate: Joi.string().isoDate().required().label("End Date"),
    bundleOffers: Joi.boolean().label("Bundle Offers"),
    bogoOffers: Joi.boolean().label("BOGO Offers"),
  }),

  dropshipping: Joi.object({
    productName: Joi.string().required().label("Product Name"),
    description: Joi.string().required().label("Description"),
    price: Joi.number().min(0).label("Price"),
    supplierInformation: Joi.object({
      name: Joi.string().required().label("Supplier Name"),
      contactPerson: Joi.string().required().label("Contact Person"),
      email: Joi.string().email().required().label("Supplier Email"),
      phone: Joi.string().label("Supplier Phone"),
    }).label("Supplier Information"),
    stockAvailability: Joi.boolean().label("Stock Availability"),
    orderPlacement: Joi.boolean().label("Order Placement"),
    shippingDetails: Joi.object({
      shippingTime: Joi.string().required().label("Shipping Time"),
      shippingCost: Joi.number().min(0).label("Shipping Cost"),
      internationalShipping: Joi.boolean().label("International Shipping"),
    }).label("Shipping Details"),
  }),

  vendorEnquiry: Joi.object({
    customerName: Joi.string().required().label("Customer Name"),
    productOfInterest: Joi.string().required().label("Product of Interest"),
    message: Joi.string().required().label("Message"),
    enquiryStatus: Joi.string().label("Enquiry Status"),
  }),

  vendorInvoice: Joi.object({
    customerName: Joi.string().required().label("Customer Name"),
    billingAddress: Joi.string().required().label("Billing Address"),
    dueDate: Joi.string().isoDate().required().label("Due Date"),
    productsServicesSold: Joi.array()
      .items(
        Joi.object({
          productName: Joi.string().required().label("Product Name"),
          quantity: Joi.number().min(0).required().label("Quantity"),
          unitPrice: Joi.number().min(0).required().label("Unit Price"),
        })
      )
      .required()
      .label("Products/Services Sold"),
  }),
  withdrawal: Joi.object({
    title: Joi.string().required().label("Title"),
    name: Joi.string().required().label("Name"),
    bankName: Joi.string().required().label("Bank Name"),
    accountNumber: Joi.string().pattern(/^\d+$/).required().label("Account Number"),
    IFSCCode: Joi.string().required().label("IFSC Code"),
    branchName: Joi.string().required().label("Branch Name"),
    default: Joi.string().label("Default"),
  }),
};

const validateProduct = async (req, res, next) =>
  validateRequest(schemas.product, req, res, next);
const validateCategory = async (req, res, next) =>
  validateRequest(schemas.category, req, res, next);
const validateDiscount = async (req, res, next) =>
  validateRequest(schemas.discount, req, res, next);
const validateDropshipping = async (req, res, next) =>
  validateRequest(schemas.dropshipping, req, res, next);
const validateVendorEnquiry = async (req, res, next) =>
  validateRequest(schemas.vendorEnquiry, req, res, next);
const validateVendorInvoice = async (req, res, next) =>
  validateRequest(schemas.vendorInvoice, req, res, next);
const validateAttribute = async (req, res, next) =>
  validateRequest(schemas.attribute, req, res, next);
const validateWithdrawal = async (req, res, next) =>
  validateRequest(schemas.withdrawal, req, res, next);

module.exports = {
  validateProduct,
  validateCategory,
  validateDiscount,
  validateDropshipping,
  validateVendorEnquiry,
  validateVendorInvoice,
  validateAttribute,
  validateWithdrawal,
};
