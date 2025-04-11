const { withdrawalModel } = require("../models/withdrawal.model");

const saveAccount = async (body, session) => {
  try {
    const account = new withdrawalModel(body);
    await account.save(session);
    return account;
  } catch (error) {
    throw error;
  }
};
const upAccount = async (id, body) => {
  try {
    const account = await withdrawalModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return account;
  } catch (error) {
    throw error;
  }
};
const delAccount = async (id) => {
  try {
    return await withdrawalModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
const viewAll = async (page = 1, pageSize = 8, vendorName) => {
  try {
    const skip = (page - 1) * pageSize;
    const totalDocs = await withdrawalModel.countDocuments({
      vendorName: vendorName,
    });
    const results = await withdrawalModel
      .find({ vendorName: vendorName })
      .skip(skip)
      .limit(pageSize);

    return {
      length: totalDocs,
      results: results,
    };
  } catch (error) {
    throw error;
  }
};
const viewByVen = async (vendorName) => {
  try {
    return await withdrawalModel.find({ vendorName: vendorName });
  } catch (error) {
    throw error;
  }
};
const findAccById = async(id)=>{
  try {
    const account = await withdrawalModel.findById(id);
    return account;
  } catch (error) {
    throw error;
  }
}
const findByAccNumber = async(accountNumber)=>{
  try {
    const account = await withdrawalModel.find({accountNumber:accountNumber});
    return account;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  saveAccount,
  upAccount,
  delAccount,
  viewAll,
  viewByVen,
  findAccById,
  findByAccNumber
};
