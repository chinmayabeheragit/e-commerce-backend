const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const catQuiry = require("../queries/vendor.catReq.query");
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
const addReqCat = async (body, vendorName, session) => {
  try {
    await checkBody(body);
    body.name = vendorName;
    return await catQuiry.saveCat(body, session);
  } catch (error) {
    throw error;
  }
};
const getReqCat = async (vendorName) => {
  try {
    const reqCats = await catQuiry.viewAllCatReq(vendorName);
    if (!reqCats || reqCats.length === 0) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "No category requests found.",
        "The vendor has not requested any categories."
      );
    }
    return reqCats;
  } catch (error) {
    throw error;
  }
};
const upReqCat = async (id, body, vendorName) => {
  try {
    await checkBody(body);
    const cat = await catQuiry.findCatById(id);
    if (!cat) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Category not found.",
        "The Category does not exist or the vendor does not have permission to update it."
      );
    }
    if(cat.name !== vendorName){
        throw customException.error(
            statusCode.FORBIDDEN,
            "Vendor mismatch.",
            "The vendor trying to update the category does not own it."
          ); 
    }
    const updatedCat = await catQuiry.upReqCat(id, body);
    return updatedCat;
  } catch (error) {
    throw error;
  }
};
const delReqCat = async (vendorName, id) => {
  try {
    const cat = await catQuiry.findCatById(id);
    if (!cat) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Category not found.",
        "The Category does not exist or the vendor does not have permission to delete it."
      );
    }
    if(cat.name !== vendorName){
        throw customException.error(
            statusCode.FORBIDDEN,
            "Vendor mismatch.",
            "The vendor trying to delete the category does not own it."
          ); 
    }
    const delCat = await catQuiry.delReqCat(id);
    return delCat;
  } catch (error) {
    throw error;
  }
};
const findStatusAccCat = async () => {
  try {
    return await catQuiry.findStatusAccCat();
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addReqCat,
  getReqCat,
  upReqCat,
  delReqCat,
  findStatusAccCat,
};
