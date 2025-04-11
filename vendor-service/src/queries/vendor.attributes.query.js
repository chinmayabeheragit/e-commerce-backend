const { attributesModel } = require("../models/attributes.model");
const saveAttri = async (body, session) => {
  try {
    const attri = new attributesModel(body);
    await attri.save(session);
    return attri;
  } catch (error) {
    throw error;
  }
};
const viewAll = async (vendorName) => {
  try {
    return await attributesModel.find({vendorName:vendorName});
  } catch (error) {
    throw error;
  }
};
const upAttri = async (id, body) => {
    try {
      const result = await attributesModel.findByIdAndUpdate(id, body, { new: true });
      return result;
    } catch (error) {
      throw error;
    }
  };
const delAttri = async (id) => {
  try {
    return await attributesModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
const findAttriById = async(id)=>{
  try {
    const attribute = await attributesModel.findById(id);
    return attribute;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  saveAttri,
  viewAll,
  upAttri,
  delAttri,
  findAttriById
};
