
const axios = require('axios');
const PaymentRepository = require('../Querys/user.transaction.query');
const customException = require('../../commons/exception/customException');
const StatusCode = require('../../commons/utils/statusCode');

const initiatePayment = async (amount, currency, description) => {
  try {
    const API_URL = 'https://sandbox-apis.boxpay.tech/v0';
    const response = await axios.post(API_URL, {
      amount,
      currency,
      description,
      apiKey: process.env.BOXPAY_API_KEY
    });

    if (response.data && response.data.paymentId) {
      await PaymentRepository.saveTransaction(response.data);
      return response.data;
    } else {
      throw customException.error(
        StatusCode.NOT_FOUND,
        null,
        'Payment initiation failed'
      );
    }
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw customException.error(
      StatusCode.SERVER_ERROR,
      null,
      'Payment initiation failed'
    );
  }
};

const handleWebhook = async (webhookData) => {
  try {
    await PaymentRepository.updateTransaction(webhookData);
  } catch (error) {
    console.error('Error handling webhook:', error);
    throw customException.error(
      StatusCode.SERVER_ERROR,
      null,
      'Webhook handling failed'
    );
  }
};

module.exports = {
  initiatePayment,
  handleWebhook,
};
