const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const productQuery = require("../queries/vendor.product.query");
const checkBody = async(body)=>{
  try {
      if(Object.keys(body).length === 0){
          throw customException.error(
              statusCode.BAD_REQUEST,
              "Request body is empty.",
              "The request body cannot be empty."
            );
      }
      return body;
  } catch (error) {
      throw error;
  }
}
const addProduct = async (body, vendorName, session) => {
  try {
    await checkBody(body);
    body.vendorName = vendorName;
    return await productQuery.saveProd(body, session);
  } catch (error) {
    throw error;
  }
};
const getAllProducts = async (vendorName, page, pageSize) => {
  try {
    return await productQuery.viewProd(vendorName, page, pageSize);
  } catch (error) {
    throw error;
  }
};
const getProducts = async () => {
  try {
    const products = await productQuery.findAll();
    return products;
  } catch (error) {
    throw error;
  }
};
const updateProd = async (vendorName, prodId, updatedData) => {
  try {
    await checkBody(updatedData);
    const existingProd = await productQuery.findProd(prodId);
    if (!existingProd) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Product not found.",
        `${prodId} is not associated with any product. Please check...`
      );
    }
    if (existingProd.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to update the product does not own it."
      );
    }
    updatedData.vendorName = vendorName;
    if (updatedData.quantityInStock) {
      updatedData.quantityInStock =
        updatedData.quantityInStock +
        existingProd.quantityInStock -
        updatedData.alreadySold;
    } else {
      updatedData.quantityInStock =
        existingProd.quantityInStock - updatedData.alreadySold;
    }
    updatedData.alreadySold =
      updatedData.alreadySold + existingProd.alreadySold;
    return await productQuery.updateProd(prodId, updatedData);
  } catch (error) {
    throw error;
  }
};
const deleteProd = async (vendorName, prodId) => {
  try {
    const prodIdExist = await productQuery.findProd(prodId);
    if (!prodIdExist) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Product not found.",
        "Product with the provided ID does not exist."
      );
    }
    if (prodIdExist.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to delete the product does not own it."
      );
    }
    return await productQuery.deleteProd(prodId);
  } catch (error) {
    throw error;
  }
};
const viewProdsByAge = async (vendorName,body) => {
  try {
    await checkBody(body);
    const products = await productQuery.viewProdsByAge(vendorName,body.age);
    return products;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addProduct,
  getAllProducts,
  getProducts,
  updateProd,
  deleteProd,
  viewProdsByAge,
};
