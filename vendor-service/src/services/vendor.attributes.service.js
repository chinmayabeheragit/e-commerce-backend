const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const attriQuery = require("../queries/vendor.attributes.query");
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
const addAttribute = async (body, vendorName, session) => {
  try {
    await checkBody(body);
    body.vendorName = vendorName;
    return await attriQuery.saveAttri(body, session);
  } catch (error) {
    throw error;
  }
};
const viewAll = async (vendorName) => {
  try {
    return await attriQuery.viewAll(vendorName);
  } catch (error) {
    throw error;
  }
};
const updateAttri = async (id, body, vendorName) => {
  try {
    await checkBody(body);
    const attribute = await attriQuery.findAttriById(id);
    if (!attribute) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Attribute not found.",
        "The attribute does not exist or the vendor does not have permission to update it."
      );
    }
    if (attribute.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to update the attribute does not own it."
      );
    }
    return await attriQuery.upAttri(id, body);
  } catch (error) {
    throw error;
  }
};
const deleteAttri = async (id, vendorName) => {
  try {
    const attribute = await attriQuery.findAttriById(id);
    if (!attribute) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Attribute not found.",
        "The attribute does not exist or the vendor does not have permission to delete it."
      );
    }
    if (attribute.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to delete the attribute does not own it."
      );
    }
    return await attriQuery.delAttri(id);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addAttribute,
  viewAll,
  updateAttri,
  deleteAttri,
};
