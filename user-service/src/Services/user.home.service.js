const HomeQuery = require("../Querys/user.home.query");
const productQuery = require("../Querys/vendor.product.query");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");


const viewBannerById = async (bannerId) => {
  try {
    const banner = await productQuery.getBannerById(bannerId);
    if (!banner) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Banner not found.",
        `${bannerId} is not associated with any banner. Please check the ID and try again.`
      );
    }
    return banner;
  } catch (error) {
    throw error;
  }
};

const viewProductsByCategory = async (categoryId) => {
  try {
    const products = await productQuery.getProductByCategoryId(categoryId);
    if(!products) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "No products found.",
        "No products exist in the given category."
      );
    }
    return products;
  } catch (error) {
    throw  error;
  }
};
const viewAllCategories = async () => {
  try {
    const categories = await productQuery.viewAllCategories();
    return categories;
  } catch (error) {
    throw new Error("Failed to fetch all categories");
  }
};
const viewAllBrands = async () => {
  try {
    const brands = await productQuery.viewAllBrands();
    return brands;
  } catch (error) {
    throw new Error("Failed to fetch all brands");
  }
};
const viewStoreById = async (storeId) => {
  try {
    const store = await HomeQuery.getById(storeId);
    if (!store) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Store not found.",
        `${storeId} is not associated with any store. Please check the ID and try again.`
      );
    }
    return store;
  } catch (error) {
    throw error;
  }
};

const viewAllAgeCategories = async () => {
  try {
    const ageCategories = await HomeQuery.find();
    return ageCategories;
  } catch (error) {
    throw new Error("Failed to fetch all age categories");
  }
};
const shopByDiscount = async () => {
  try {
    const products = await HomeQuery.find({ discount: { $gt: 0 } });
    return products;
  } catch (error) {
    throw new Error("Failed to shop by discount");
  }
};
const viewProductsByAgeCategory = async (ageCategory) => {
  try {
    const products = await HomeQuery.find({ ageCategory });
    if(!products) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "No products found.",
        `No products are associated with the age category '${ageCategory}'. Please check the category and try again.`
      )
    }
    return products;
  } catch (error) {
    throw error;
  }
};
const viewAllBanner = async () => {
  try {
    return await productQuery.viewAllBanner();
  } catch (error) {
    throw error;
  }
};
module.exports = {
  viewBannerById,
  viewProductsByCategory,
  viewAllCategories,
  viewAllBrands,
  viewStoreById,
  viewAllAgeCategories,
  shopByDiscount,
  viewProductsByAgeCategory,
  viewAllBanner,
};
