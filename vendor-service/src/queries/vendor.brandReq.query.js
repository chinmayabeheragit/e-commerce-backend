const { brandReqModel } = require("../models/brandRequest.model");
const saveBrand = async (body, session) => {
  try {
    const brand = await new brandReqModel(body);
    await brand.save(session);
    return brand;
  } catch (error) {
    throw error;
  }
};
const viewAllBrandReq = async (vendorName) => {
  try {
    return await brandReqModel.find({name:vendorName});
  } catch (error) {
    throw error;
  }
};
const upReqBrand = async(id, body)=>{
  try {
    return await brandReqModel.findByIdAndUpdate(id, body);
  } catch (error) {
    throw error;
  }
}
const delReqBrand = async(id)=>{
  try {
    return await brandReqModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}
const findStatusAccBrand = async()=>{
  try {
      return await brandReqModel.find({ status: 'accept' }).select('title');
  } catch (error) {
      throw error;
  }
}
const findBrandById = async(id)=>{
  try {
    const brand = await brandReqModel.findById(id);
    return brand;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  saveBrand,
  viewAllBrandReq,
  upReqBrand,
  delReqBrand,
  findStatusAccBrand,
  findBrandById
};
