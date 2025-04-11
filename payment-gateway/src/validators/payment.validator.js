const Joi = require("joi");
const response = require("../../commons/response/response");
const statusCode = require("../../commons/utils/statusCode");
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
    createASession: Joi.object({
        context: Joi.object({
          countryCode: Joi.string().required(),
          orderId: Joi.string().required()
        }).required(),
        money: Joi.object({
          amount: Joi.number().required(),
          currencyCode: Joi.string().required()
        }).required(),
        frontendReturnUrl: Joi.string().uri().required(),
        statusNotifyUrl: Joi.string().uri().required(),
        frontendBackUrl: Joi.string().uri().required()
      })
  }
const validateCreateASession = async(req, res, next)=>validateRequest(schemas.createASession, req, res, next);
module.exports = {
    validateCreateASession,
    // validateOperationInquiry
}