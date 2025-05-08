const { productManagementModel } = require("../models/productManagement.model");

const saveProd = async (productData, transaction) => {
  try {
    const product = await productManagementModel.create(productData, { transaction });
    return product;
  } catch (error) {
    throw error;
  }
};

const viewProd = async (vendorName, page = 1, pageSize = 8) => {
  try {
    const skip = (page - 1) * pageSize;
    const products = await productManagementModel
      .find({
        vendorName: vendorName,
      })
      .skip(skip)
      .limit(pageSize);
    const count = await productManagementModel.countDocuments({ vendorName: vendorName });
    return [{ count: count, products: products }];
  } catch (error) {
    throw error;
  }
};
const deleteProd = async (prodId) => {
  try {
    const deletedProduct =
      await productManagementModel.findByIdAndDelete(prodId);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
const updateProd = async (productId, updatedData) => {
  try {
    const result = await productManagementModel.findByIdAndUpdate(
      productId,
      {
        $set: { ...updatedData },
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const findProd = async (productId) => {
  try {
    const existingProd = await productManagementModel.findById(productId);
    return existingProd;
  } catch (error) {
    throw error;
  }
};
const findProdsByCat = async (productCategory) => {
  try {
    return await productManagementModel.find({ productCategory, status: true });
  } catch (error) {
    throw error;
  }
};
const saveCat = async (catName, prodId) => {
  try {
    return await productManagementModel.findByIdAndUpdate(
      prodId,
      {
        $set: {
          productCategory: catName,
        },
      },
      {
        new: true,
      }
    );
  } catch (error) {
    throw error;
  }
};
const removeCat = async (prodId) => {
  try {
    return await productManagementModel.findByIdAndUpdate(
      prodId,
      {
        $set: {
          productCategory: "",
        },
      },
      {
        new: true,
      }
    );
  } catch (error) {
    throw error;
  }
};
const upCntStk = async (prodId, stock) => {
  try {
    return await productManagementModel.findByIdAndUpdate(
      prodId,
      {
        $set: {
          stockQuantity: stock,
        },
      },
      {
        new: true,
      }
    );
  } catch (error) {
    throw error;
  }
};
const findAll = async () => {
  try {
    return await productManagementModel
      .find()
      .select("-vendorName -alreadySold");
  } catch (error) {
    throw error;
  }
};
const viewProdsByAge = async(vendorName, age)=>{
  try {
    const products = await productManagementModel.find({
      vendorName: vendorName,
      age: age
    });
    return products;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  saveProd,
  updateProd,
  deleteProd,
  findProd,
  viewProd,
  findProdsByCat,
  saveCat,
  removeCat,
  upCntStk,
  findAll,
  viewProdsByAge
};
