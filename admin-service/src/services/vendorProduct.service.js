const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const productQuery = require("../queries/vendor.product.query");
const getAllProducts = async (page, pageSize) => {
  try {
    const products = await productQuery.viewProd(page, pageSize);
    if (!products) {
      throw customException.error(
        statusCode.NOT_FOUND,
       "Products not found.",
      "No products found for the specified page and pageSize."
      );
    }
    return products;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllProducts,
};
