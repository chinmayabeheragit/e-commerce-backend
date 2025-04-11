const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const brandQuery = require("../queries/adminbrand.query");
const checkBody = async (body) => {
  try {
    if (Object.keys(body).length === 0) {
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
};
const checkBrandById = async (id) => {
  try {
    const brand = await brandQuery.findbrandById(id);
    if (!brand) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Brand Not Found",
        `No brand found with ID ${id}. Please verify the brand ID and try again.`
      );
    }
    return brand;
  } catch (error) {
    throw error;
  }
};
const addbrand = async (body, session) => {
  try {
    await checkBody(body);
    const savedBrand = await brandQuery.createbrand(body, session);
    return savedBrand;
  } catch (error) {
    throw error;
  }
};
const getallbrand = async () => {
  try {
    const brands = await brandQuery.findAllbrand();
    if (!brands) {
        throw customException.error(
          statusCode.NOT_FOUND,
          "Brands Not Found",
          "No brands were found in the database. Please verify if the brands have been properly created and try again."
        );
      }
    return brands;
  } catch (error) {
    throw error;
  }
};
const viewRequestedBrand = async () => {
  try {
    const brands = await brandQuery.viewAllBrandReq();
    if (!brands || brands.length === 0) {
        throw customException.error(
          statusCode.NOT_FOUND,
          "Requested Brands Not Found",
          "No requested brands were found for the vendor. Please check if there are any pending brand requests and try again."
        );
      }
    return brands;
  } catch (error) {
    throw error;
  }
};
const getbrandbyid = async (brandId) => {
  try {
    const brand = await checkBrandById(brandId);
    return brand;
  } catch (error) {
    throw error;
  }
};
const updatebrand = async (brandId, body) => {
  try {
    await checkBody(body);
    await checkBrandById(brandId);
    const updatedBrand = await brandQuery.updatebrandById(brandId, body);
    return updatedBrand;
  } catch (error) {
    throw error;
  }
};
const upBrandStatus = async (id, body) => {
  try {
    await checkBody(body);
    await checkBrandById(id);
    const updatedBrand = await brandQuery.editBrandStatus(id, body);
    return updatedBrand;
  } catch (error) {
    throw error;
  }
};
const deletebrand = async (brandId) => {
  try {
    await checkBrandById(brandId);
    const deletedBrand = await brandQuery.deletebrandById(brandId);
    return deletedBrand;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addbrand,
  getallbrand,
  viewRequestedBrand,
  getbrandbyid,
  updatebrand,
  upBrandStatus,
  deletebrand,
};
