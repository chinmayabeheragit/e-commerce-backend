const productQuery = require('../Querys/vendor.product.query');
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");

const getAllProducts = async () => {
    try {
      return await productQuery.findAll();
    } catch (error) {
      throw error;
    }
  };
  const getProductById = async (productId) => {
    try {
      const product = await productQuery.getProductById(productId);
      if (!product) {
        throw customException.error(
          statusCode.NOT_FOUND,
          "Product not found.",
          "The product with the provided ID does not exist."
        );
      }
      return product;
    } catch (error) {
      throw error;
    }
  };
  
const getAllCategory = async () => {
  try{
    return await productQuery.viewAllCategories();
  }catch(error){
    throw error
  }
}
const getAllBrands = async  () => {
  try{
    return await productQuery.viewAllBrands();
  }catch(error){
    throw error
  }
}
const getProdsByCat = async(catName)=>{
  try {
    return await productQuery.findProdsByCat(catName.toLowerCase());
  } catch (error) {
    throw error;
  }
}
const getProdsBySubCat = async(catName)=>{
  try {
    return await productQuery.findProdsBySubCat(catName.toLowerCase());
  } catch (error) {
    throw error;
  }
}
const viewProdsByAge = async(body)=>{
  try {
    const products = await productQuery.viewProdsByAge(body.age);
    if(products.length <= 0){
      throw customException.error(
        statusCode.NOT_FOUND,
        "Product not found.",
        "The product with the provided age does not exist."
      );
    }
    return products;
  } catch (error) {
    throw error;
  }
}
module.exports = {
    getAllProducts,
    getProductById,
    getAllCategory,
    getAllBrands,
    getProdsByCat,
    viewProdsByAge,
    getProdsBySubCat
}