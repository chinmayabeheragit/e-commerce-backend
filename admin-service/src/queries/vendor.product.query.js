const { productManagementModel } = require("../models/productManagement.model");

const saveProd = async (productData, session) => {
  try {
    const product = new productManagementModel(productData);
    await product.save(session);
    return product;
  } catch (error) {
    throw error;
  }
};
const viewProd = async (page = 1, pageSize = 8) => {
  try {
    const skip = (page - 1) * pageSize;
    const productsPromise =  productManagementModel
      .find()
      .skip(skip)
      .limit(pageSize);
      const countPromise = productManagementModel.countDocuments();
      const [products, totalCount] = await Promise.all([productsPromise, countPromise]);
    return {totalCount,products};
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
    return await productManagementModel.find({productCategory});
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
};
