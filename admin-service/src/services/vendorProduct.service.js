const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
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
