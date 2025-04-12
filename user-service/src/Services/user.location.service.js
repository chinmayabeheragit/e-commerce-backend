const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const axios = require('axios');
const FormData = require('form-data');
const url = 'https://api.ecomexpress.in/apiv2/pincodes/';

const binarySearch = (data, pincode) => {
    let low = 0;
    let high = data.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midPincode = data[mid].pincode;

        if (midPincode === pincode) {
            return data[mid];
        } else if (midPincode < pincode) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return null;
}

const getLocationDetails = async (pincode) => {
    try { 
        const formData = new FormData();
        formData.append('username', process.env.ECOM_USERNAME);
        formData.append('password', process.env.ECOM_PASS);
 
        const response = await axios.post(url, formData, {
            headers: formData.getHeaders(),
            setTimeout: 60000
        });
        const sortedData = response.data.sort((a, b) => a.pincode - b.pincode);
        const location = binarySearch(sortedData, pincode);
        if (location) {
            return location;
        } else {
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                `No data found for pincode: ${pincode}`
              );
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getLocationDetails
}
 