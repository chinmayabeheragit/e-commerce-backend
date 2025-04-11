const { vendorDetailsModel } = require("../models/vendorDetails.model");
const findVendorByEmail = async (email) => {
  try {
    const vendor = await vendorDetailsModel.findOne({ email: email });
    return vendor;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  findVendorByEmail,
};
