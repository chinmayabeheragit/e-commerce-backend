const vendorQuery = require('../queries/vendorDetails.query');
const getVendorProfile = async(email)=>{
    try {
      const vendorDetails = await vendorQuery.findVendorByEmail(email);
      return vendorDetails;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getVendorProfile
}