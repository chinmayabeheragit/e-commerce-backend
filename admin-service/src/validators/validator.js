const response = require("../../commons/response/response");
const statusCode = require("../../commons/utils/statusCode");
const Joi = require('joi');
const validateCategory = async (req, res, next) => {
    const schema = Joi.object({
        cat_name: Joi.string().required().label("Category Name"),
        logo: Joi.string().required().label("Logo"),
        description: Joi.string().required().label("Description"),
        subcategories: Joi.array().items(
            Joi.string().required().label("Subcategory Name")
        )
    });
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
}
const validateBanner = async (req, res, next) => {
    const schema = Joi.object({
        bannerName: Joi.string().required(),
        categoryName: Joi.string().required(),
        imageOrVideoUpload: Joi.string().required(),
        linkOrDestinationURL: Joi.string().required(),
        displayStatus: Joi.boolean().default(true),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.boolean().default(true).label("Status"),
    });
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
const validateVendor = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        number: Joi.string()
          .pattern(/^[0-9]{10}$/)
          .required()
          .messages({
            "string.pattern.base": "Number must be a 10-digit numeric string",
          }),
        storeName: Joi.string().required(),
        warehouseAddress: Joi.string().required(),
        bankAccountDetails: Joi.object({
          accountNumber: Joi.string()
            .pattern(/^[0-9]{9,18}$/)
            .required()
            .messages({
              "string.pattern.base":
                "Account number must be between 9 to 18 digits",
            }),
          IFSCCode: Joi.string().required(),
          bankName: Joi.string().required(),
        }).required(),
        aadhar: Joi.string()
          .pattern(/^[0-9]{12}$/)
          .required()
          .messages({
            "string.pattern.base": "Aadhar must be a 12-digit numeric string",
          }),
        businessPanNumber: Joi.string().required(),
        GSTIN: Joi.string().required(),
        email: Joi.string().email().required(),
        status: Joi.string().valid("active", "inactive").default("inactive"),
        role: Joi.string().default("vendor"),
      });
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
}
const validateforproj = async (schema, req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return response.handleErrorResponse({
            errorCode: statusCode.BAD_REQUEST,
            message: error,
            displayMessage: { error: error.details[0].message },
        },
            res
        );
    }
};
const validateschemas = {
    brand: Joi.object({
        title: Joi.string().required().label("title"),
        slug: Joi.string().required().label("slug"),
        feature: Joi.boolean().required().label('featured'),
        status: Joi.string().required().label('status'),
    }),
    transaction: Joi.object({
        _id: Joi.string(),
        customerName: Joi.string().required().label('customerName'),
        date: Joi.date(),
        total: Joi.number().required(),
        method: Joi.string().required().label('method'),
        status: Joi.string().required().label('status'),
    }),
    coupon: Joi.object({
        _id: Joi.string(),
        title: Joi.string().required().label('title'),
        vouchercode: Joi.string(),
        price: Joi.number().required(),
        cappedPrice: Joi.number().required(),
        minSpent: Joi.number().required(),
        usageLimit: Joi.number().required(),
        limitPerCustomer: Joi.number().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        type: Joi.string().valid('Flat Discount', 'Percentage Discount', 'Closed').required()
    }),
    custome: Joi.object({
        _id: Joi.string(),
        customername: Joi.string().required().label('customername'),
        phonenumber: Joi.number().required(),
        created: Joi.date()
    }),
};
const validateBrand = async (req, res, next) => validateforproj(validateschemas.brand, req, res, next);
const validateTransaction = async (req, res, next) => validateforproj(validateschemas.transaction, req, res, next);
const validateCoupon = async (req, res, next) => validateforproj(validateschemas.coupon, req, res, next);
const validateCustomer = async (req, res, next) => validateforproj(validateschemas.custome, req, res, next)
module.exports = {
    validateCategory,
    validateBrand,
    validateBanner,
    validateVendor,
    validateTransaction,
    validateCoupon,
    validateCustomer
}