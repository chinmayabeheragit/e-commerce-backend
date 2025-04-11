const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const axios = require("axios");
require("dotenv").config();
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateOrderId = () => {
  const timestamp = Date.now();
  const randomString = generateRandomString(6);
  return `ORD_${timestamp}_${randomString}`;
};

const generateUniqueReference = () => {
    const timestamp = Date.now();
    const randomString = generateRandomString(6);
    return `SHOP_${timestamp}_${randomString}`;
  };
const defaultLocalCode = "en-IN";
const defaultPaymentType = "S";


const createCheckOutSession= async(body)=>{
  try {
    const url = process.env.CREATE_CHECKOUT_A_SESSION_URL_DEV;
    const apiKey = process.env.API_KEY_DEV;
    const businessUnitCode = process.env.BUSINESS_UNIT_CODE_DEV;
    const {
      context: { countryCode, orderId },
      money: { amount, currencyCode },
      frontendReturnUrl,
      statusNotifyUrl,
      frontendBackUrl
    } = body;
    const requestBody = {
      context: {
        countryCode: countryCode,
        legalEntity: {
          code: businessUnitCode
        },
        orderId: orderId,
        localCode: defaultLocalCode
      },
      paymentType: defaultPaymentType,
      money: {
        amount: amount, 
        currencyCode: currencyCode
      },
      shopper: {
        uniqueReference: generateUniqueReference() 
      },
      frontendReturnUrl: frontendReturnUrl,
      statusNotifyUrl: statusNotifyUrl,
      frontendBackUrl: frontendBackUrl
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.data;

    
  } catch (error) {
    throw error;
  }
}
const operationInquiry = async(body)=>{
  try {
    const url = process.env.OPERATION_INQUIRY_URL_DEV;
    const apiKey = process.env.API_KEY_DEV;
    const {token} = body;
    const requestBody = {token:token}
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createCheckOutSession,
  operationInquiry
}