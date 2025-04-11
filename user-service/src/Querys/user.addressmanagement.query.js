const { Address } = require("../Models/user.addressmanagement.model");
const addAddress = async (addressData, session) => {
  try {
    const address = new Address(addressData);
    return await address.save({ session });
  } catch (error) {
    throw error;
  }
};

const findAddressByPhoneNumberAndHouseNo = async (phoneNumber, houseNo) => {
  try {
    return await Address.findOne({ phoneNumber, houseNo });
  } catch (error) {
    throw error;
  }
};


const editAddress = async (addressId, addressData) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      addressData,
      { new: true }
    );
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};
const viewAddress = async (userName) => {
  try {
    return await Address.find({ email: userName });
  } catch (error) {
    throw error;
  }
};

const getAddressById = async (addressId) => {
  try {
    const address = await Address.findById(addressId);
    return address;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addAddress,
  editAddress,
  viewAddress,
  findAddressByPhoneNumberAndHouseNo,
  getAddressById
};
