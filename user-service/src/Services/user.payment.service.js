const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const ordermanagementQuery = require('../Querys/user.ordermanagementQuery')
const OrderManagementService = require('../Services/user.ordermanagement.service')
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


const generateUniqueReference = () => {
    const timestamp = Date.now();
    const randomString = generateRandomString(6);
    return `SHOP_${timestamp}_${randomString}`;
  };
const defaultLocalCode = "en-IN";
const defaultPaymentType = "S";


const createCheckOutSession = async (body) => {
  try {
    const url = process.env.CREATE_CHECKOUT_A_SESSION_URL_DEV;
    const apiKey = process.env.API_KEY_DEV;
    const businessUnitCode = process.env.BUSINESS_UNIT_CODE_DEV;

    const {
      context: { countryCode, orderId },
      money: { currencyCode },
      frontendReturnUrl,
      statusNotifyUrl,
      frontendBackUrl
    } = body;

    // Fetch order details
    const orderDetails = await ordermanagementQuery.getOrderById(orderId);
   if(!orderDetails) {
    throw customException.error(
      statusCode.NOT_FOUND,
      "Order details not found .",
      `No Order details found for the ${orderId}. please check the order id `
    )
   }

    const amount = orderDetails.TotalAmount;

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
        amount: amount.toString(),
        currencyCode: currencyCode
      },
      shopper: {
        uniqueReference: generateUniqueReference()
      },
      frontendReturnUrl: frontendReturnUrl,
      statusNotifyUrl: statusNotifyUrl,
      frontendBackUrl: frontendBackUrl
    };

    // Create payment session
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const updatedOrder = await ordermanagementQuery.updateOrderAsPaid(orderId);
    await ordermanagementQuery.saveConfirmedOrder(updatedOrder);

    return response.data;

  } catch (error) {
    throw error;
  }
};


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