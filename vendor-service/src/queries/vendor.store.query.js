const { storeModel } = require("../models/store.model");
const saveStore = async (body, session) => {
  try {
    const store = new storeModel(body);
    await store.save(session);
    return store;
  } catch (error) {
    throw error;
  }
};
const upStore = async (id, body) => {
  try {
    const updatedStore = await storeModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedStore;
  } catch (error) {
    throw error;
  }
};
const findVendor = async(vendorName)=>{
    try {
        const vendor = await storeModel.findOne({ vendorName });
        return vendor;
    } catch (error) {
      throw error;  
    }
}
const findAll = async()=>{
    try {
        return await storeModel.find();
    } catch (error) {
        throw error;
    }
}
module.exports = {
  saveStore,
  upStore,
  findVendor,
  findAll
};
