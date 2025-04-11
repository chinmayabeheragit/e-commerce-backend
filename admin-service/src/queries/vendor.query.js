const { VendorModel } = require("../models/vendor.model");
const {vendorDetailsModel} = require("../models/vendorDetails.model");
const addVendor = async (vendorData, session) => {
  try {
    const vendor = new VendorModel(vendorData);
    await vendor.save(session);
    return vendor;
  } catch (error) {
    throw error;
  }
};
const listVendors = async () => {
  try {
    return await VendorModel.find();
  } catch (error) {
    throw error;
  }
};
const viewInactiveVendor = async()=>{
  try {
    return await VendorModel.find({status:'inactive'})
  } catch (error) {
    throw error;
  }
}
const editVendor = async (vendorId, updatedData) => {
  try {
    return await VendorModel.findOneAndUpdate({ _id: vendorId }, updatedData, { new: true });
  } catch (error) {
    throw error;
  }
};
const deleteVendor = async (vendorId) => {
  try {
    return await VendorModel.findByIdAndDelete(vendorId);
  } catch (error) {
    throw error;
  }
};
const getReqVendor = async()=>{
  try {
    const vendorDetails = await vendorDetailsModel.find({ "login.password": null }).exec();
    return vendorDetails;
  } catch (error) {
    throw error;
  }
}
const findVendorById = async(id)=>{
  try {
    const vendor = await vendorDetailsModel.findById(id);
    return vendor;
  } catch (error) {
    throw error;
  }
}
const updateVendor = async(id, data)=>{
  try {
    const updatedVendor = await vendorDetailsModel.findByIdAndUpdate(
      id,
      {
        'login.email': data.email,
        'login.vendorId': data.vendorId,
        'login.password': data.password,
        status: 'active'
      },
      { new: true } 
    );
    return updatedVendor;
  } catch (error) {
    throw error;
  }
}
const viewVendorByStatus = async(status)=>{
  try {
    const vendors = await vendorDetailsModel.find({status:status});
    return vendors;
  } catch (error) {
    throw error;
  }
}
const makeVendorInactive = async(id)=>{
  try {
    const updatedVendor = await vendorDetailsModel.findByIdAndUpdate(id,{status: 'inactive'});
    return updatedVendor;
  } catch (error) {
    throw error;
  }
}
const makeVendorActive = async(id)=>{
  try {
    const updatedVendor = await vendorDetailsModel.findByIdAndUpdate(id,{status: 'active'});
    return updatedVendor;
  } catch (error) {
    throw error;
  }
}
const saveVendorDetails = async (vendorData, session) => {
  try {
    const vendorDetails = await new vendorDetailsModel(vendorData);
    await vendorDetails.save(session);
    return vendorDetails;
  } catch (error) {
    throw error;
  }
};
const viewAllVendors = async()=>{
  try {
    const vendors = await vendorDetailsModel.find();
    return vendors;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  addVendor,
  listVendors,
  viewInactiveVendor,
  editVendor,
  deleteVendor,
  getReqVendor,
  findVendorById,
  updateVendor,
  viewVendorByStatus,
  makeVendorInactive,
  makeVendorActive,
  saveVendorDetails,
  viewAllVendors
};