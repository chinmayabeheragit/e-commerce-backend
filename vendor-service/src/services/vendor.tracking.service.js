const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const axios = require('axios');
const FormData = require('form-data');

const generateAwb = async (type, count) => {
    try {
      const API_URL = 'https://api.ecomexpress.in/apiv2/fetch_awb/';
      const formData = new FormData();
      formData.append('username', process.env.ECOM_USERNAME);
      formData.append('password', process.env.ECOM_PASS);
      formData.append('count', count.toString()); 
      formData.append('type', type);
  
      const response = await axios.post(API_URL, formData, {
        headers: formData.getHeaders(),
        timeout: 60000
      });
  
      if (response.data && response.data.awb && response.data.awb.length > 0) {
        return response.data.awb[0];
      } else {
        throw customException.error(
          statusCode.NOT_FOUND,
          null,
          'AWB number not generated'
        );
      }
    } catch (error) {
      console.error('Error fetching AWB number:', error);
      throw customException.error(
        statusCode.SERVER_ERROR,
        null,
        'Error fetching AWB number'
      );
    }
  };

  module.exports = {
    generateAwb
  }