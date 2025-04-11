const Joi = require("joi");
const response = require("../../commons/response/response");
const statusCode = require("../../commons/utils/statusCode");


const validateRequest = async (schemas, req, res, next) => {
  try {
    await schemas.validateAsync(req.body);
    next();
  } catch (error) {
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: error.message,
        displayMessage: { error: error.details[0].message },
      },
      res
    );
  }
}; 


const schemas = {
    pincode: Joi.object({
        pincode: Joi.number()
          .integer()
          .required()
          .label("pincode must be a number.")
          .messages({
            'number.base': 'pincode must be a number.',
            'number.integer': 'pincode must be an integer.',
            'any.required': 'pincode is required.'
          }),
      }),
};


const pincodeValidation = async (req, res, next) =>
  validateRequest(schemas.pincode, req, res, next);


const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).required().label("Invalid email format."),
    password: Joi.string().required().label("Password is required.")
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details[0].context.label;
    let displayMessage = errorMessage;
    if (!errorMessage) {
      errorMessage = statusCode.BAD_REQUEST;
    }
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: displayMessage,
      },
      res
    );
  }
  next();
};

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().label("Name is required and should be between 3 and 50 characters."),
    email: Joi.string().pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).required().label("Invalid email format."),
    password: Joi.string().min(8).required().label("Password is required and should be at least 8 characters long."),
    mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).required().label("Mobile number is required and should be 10 digits."),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details[0].context.label;
    let displayMessage = errorMessage;
    if (!errorMessage) {
      errorMessage = statusCode.BAD_REQUEST;
    }
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: displayMessage,
      },
      res
    );
  }
  next();
};


const validateAddAddress = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required().label("Full name is required."),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().label("Phone number is required and should be 10 digits."),
    pinCode: Joi.number().integer().min(100000).max(999999).required().label("Pincode is required and should be 6 digits."),
    state: Joi.string().pattern(/^[A-Za-z\s]+$/).required().label("State is required and should contain only alphabet characters."),
    city: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).required().label("City is required and should contain only alphabet characters and numbers."),
    landmark: Joi.string().required().label("Landmark is required."),
    houseNo: Joi.string().required().label("House number is required."),
    email: Joi.string().pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).optional().label("Invalid email format."),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: errorMessage,
      },
      res
    );
  }
  next();
};

const validateProfile = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required().label("First name is required and should be between 3 and 50 characters."),
    lastName: Joi.string().min(3).max(50).required().label("Last name is required and should be between 3 and 50 characters."),
    email: Joi.string().email({ tlds: { allow: false } }).required().label("Invalid email format."),
    mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).required().label("Mobile number is required and should be 10 digits."),
    userImage: Joi.string().optional(),
    status: Joi.string().valid("active", "deactivate").optional(),
    user: Joi.string().required().label("User is required."),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details[0].context.label;
    let displayMessage = errorMessage;
    if (!errorMessage) {
      errorMessage = statusCode.BAD_REQUEST;
    }
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: displayMessage,
      },
      res
    );
  }
  next();
};

const validateMobileNumber = (req, res, next) => {
  const schema = Joi.object({
    mobileNumber: Joi.string().pattern(/^[0-9]{10}$/).required().label("Mobile number is required and should be 10 digits."),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    let errorMessage = validateResult.error.details[0].context.label;
    let displayMessage = errorMessage;
    if (!errorMessage) {
      errorMessage = statusCode.BAD_REQUEST;
    }
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: displayMessage,
      },
      res
    );
  }
  next();
};

const validateManifest = (req, res, next) => {
  const schema = Joi.object({
    awbNumber: Joi.string().required().label("AWB number is required."),
    shipmentDetails: Joi.object({
      destination: Joi.string().required().label("Destination is required."),
      weight: Joi.number().required().label("Weight is required."),
      dimensions: Joi.string().required().label("Dimensions are required."),
      value: Joi.number().required().label("Value is required."),
    }).required().label("Shipment details are required."),
    createdBy: Joi.string().required().label("Created by is required."),
    createdAt: Joi.date().required().label("Created at is required."),
    updatedAt: Joi.date().optional(),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    const errorMessage = validateResult.error.details[0].message;
    return res.status(400).json({
      errorCode: 400,
      message: errorMessage,
      status: false,
    });
  }
  next();
};


const validateNDRData = (req, res, next) => {
  const schema = Joi.object({
    awbNumber: Joi.string().required().label("AWB number is required."),
    ndrDetails: Joi.object().required().label("NDR details are required."),
    // Add more fields as necessary
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    const errorMessage = validateResult.error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
      },
      res
    );
  }
  next();
};

const validateShipmentCancellation = (req, res, next) => {
  const schema = Joi.object({
    awbNumber: Joi.string().required().label("AWB number is required."),
    cancellationReason: Joi.string().required().label("Cancellation reason is required."),
  });

  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    const errorMessage = validateResult.error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
      },
      res
    );
  }
  next();
};


const validateOrderQuantity = (req, res, next) => {
  const schema = Joi.object({
    orderId: Joi.string().required(),
    quantity: Joi.number().integer().min(3).max(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return response.handleErrorResponse(
      { errorCode: statusCode.BAD_REQUEST, message: error.details[0].message },
      res
    );
  }
  next();
};

const validateSingleProductOrder = (req, res, next) => {
  const schema = Joi.object({
    itemId: Joi.string().required().label("Product ID (itemId) is required."),  
    addressId: Joi.string().required().label("Address ID is required."),  
    deliveryCharges: Joi.number().min(0).required().label("Delivery charges must be a non-negative number."), 
    CustomerName: Joi.string().optional().label("Customer Name must be a valid string."),  
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: errorMessage,
      },
      res
    );
  }
  next();
};
const validatesCartProductOrder = (req, res, next) => {
  const schema = Joi.object({
    cartId: Joi.string().required().label("Cart ID is required."),  
    addressId: Joi.string().required().label("Address ID is required."),  
    deliveryCharges: Joi.number().min(0).required().label("Delivery charges are required and must be at least 0."),  
    CustomerName: Joi.string().required().label("Customer name is required.")  
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    return response.handleErrorResponse(
      {
        errorCode: statusCode.BAD_REQUEST,
        message: errorMessage,
        displayMessage: errorMessage,
      },
      res
    );
  }

  next();
};


module.exports = {
  pincodeValidation,
  validateLogin,
  validateRegister,
  validateAddAddress,
  validateProfile,
  validateMobileNumber,
  validateManifest,
  validateNDRData,
  validateShipmentCancellation,
  validateOrderQuantity,
  validateSingleProductOrder,
  validatesCartProductOrder
};





