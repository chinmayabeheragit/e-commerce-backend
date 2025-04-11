const { productManagementModel } = require("../Models/productManagement.model");
const { BannerModel } = require("../Models/banner.model");
const { CategoryModel } = require("../Models/category.model");
const { AdminBrand } = require("../Models/brand.model");

const saveProd = async (productData, session) => {
  try {
    const product = new productManagementModel(productData);
    await product.save(session);
    return product;
  } catch (error) {
    throw error;
  }
};
const getProductsByIds = async (productIds) => {
  try {
      return await productManagementModel.find({ _id: { $in: productIds } });
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
    return products;
  } catch (error) {
    throw error;
  }
};
const deleteProd = async (prodId) => {
  try {
    const deletedProduct = await productManagementModel.findByIdAndDelete(
      prodId
    );
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
    return await productManagementModel.find({ category: productCategory });
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
const getProductById = async (productId) => {
  try {
    return await productManagementModel.findById(productId);
  } catch (error) {
    throw error;
  }
};

const getBannerById = async (bannerId) => {
  try {
    const banner =  await BannerModel.findById(bannerId);
    return banner
  } catch (error) {
    throw error;
  }
};

const viewAllBanner = async()=>{
  try {
    return await BannerModel.find();
  } catch (error) {
    throw error;
  }
}
const getProductByCategoryId = async (categoryId) => {
  try {
    return await CategoryModel.findById(categoryId);
  } catch (error) {
    throw error;
  }
};
const viewAllCategories = async () => {
  try {
    return await CategoryModel.find();
  } catch (error) {
    throw error;
  }
};
const viewAllBrands = async () => {
  try {
    return await AdminBrand.find({ status: 'accept' });
  } catch (error) {
    throw error;
  }
};

const viewProdsByAge = async (age) => {
  try {
    return await productManagementModel.find({ age: age });
  } catch (error) {
    throw error;
  }
};
const findProdsBySubCat = async(catName)=>{
  try {
    return await productManagementModel.find({subCategory:catName});
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
  getProductById,
  getBannerById,
  viewAllBanner,
  getProductByCategoryId,
  viewAllCategories,
  viewAllBrands,
  viewProdsByAge,
  findProdsBySubCat,
  getProductsByIds
};
