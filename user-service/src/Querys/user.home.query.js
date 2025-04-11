const { storeModel } = require("../Models/store.model");

const findById = async () => {
    try {
        return;
    } catch (error) {
        throw error;
    }
};
const find = async () => {
    try {
        return;
    } catch (error) {
        throw error;
    }
};


const getById = async (storeId) => {
  try {
    const store = await storeModel.findById(storeId);
    const stores = await storeModel.find();
    return store;
  } catch (error) {
    throw error;
  }
};



module.exports = {
    findById,
    find,
    getById
}
