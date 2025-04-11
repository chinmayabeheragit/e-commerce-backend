const {CategoryModel}=require("../models/categoryRequest.model");
const saveCat = async (body,session) => {
  try {
    const cat = new CategoryModel(body);
    await cat.save({ session });
    return cat;
  } catch (error) {
    throw error;
  }
};
  const viewAllCatReq = async (vendorName) => {
    try {
      return await CategoryModel.find({name: vendorName, status: 'request'});
    } catch (error) {
      throw error;
    }
  };
  const upReqCat = async(id, body)=>{
    try {
      return await CategoryModel.findByIdAndUpdate(id, body);
    } catch (error) {
      throw error;
    }
  }
  const delReqCat = async(id)=>{
    try {
      return await CategoryModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  const findStatusAccCat = async()=>{
    try {
      return await CategoryModel.find({ status: 'accept' }).select('cat_name subcategories')
    } catch (error) {
      throw error;
    }
  }
  const findCatById = async(id)=>{
    try {
      const cat = await CategoryModel.findById(id);
      return cat;
    } catch (error) {
      throw error;
    }
  }
  module.exports = {
   saveCat,
   viewAllCatReq,
   upReqCat,
   delReqCat,
   findStatusAccCat,
   findCatById
  };
  