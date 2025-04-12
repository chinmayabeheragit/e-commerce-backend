const AddressManagementQuery = require("../Querys/user.addressmanagement.query");
const statusCode = require("../../../common-libs/utils/statusCode");
const customException = require("../../../common-libs/exception/customException");

const addAddress = async (body, userName, session) => {
  try {
    const { phoneNumber, houseNo } = body;
    const existingAddress =
      await AddressManagementQuery.findAddressByPhoneNumberAndHouseNo(
        phoneNumber,
        houseNo
      );
    if (existingAddress) {
      throw customException.error(
        statusCode.DATA_ALREADY_EXISTS,
        "Address already exists.",
        `An address with the phone number ${body.phoneNumber} and house number ${body.houseNo} already exists.`
      );
    }

    body.email = userName;
    return await AddressManagementQuery.addAddress(body, session);
  } catch (error) {
    throw error;
  }
};

const editAddress = async (addressId, addressData) => {
  try {
    return await AddressManagementQuery.editAddress(addressId, addressData, {
      new: true,
    });
  } catch (error) {
    throw error;
  }
};
const viewAddress = async (userName) => {
  try {
    return await AddressManagementQuery.viewAddress(userName);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addAddress,
  editAddress,
  viewAddress,
};
