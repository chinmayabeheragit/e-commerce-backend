const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const brandQuiry = require("../queries/vendor.brandReq.query");

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
const addReqBrand = async(body,vendorName,session)=>{
    try {
        await checkBody(body);
        body.name = vendorName;
        return await brandQuiry.saveBrand(body, session);
    } catch (error) {
     throw error;   
    }
}
const getReqBrand = async(vendorName)=>{
    try {
        const reqBrands = await brandQuiry.viewAllBrandReq(vendorName);
        if (!reqBrands || reqBrands.length === 0) {
            throw customException.error(
              statusCode.NOT_FOUND,
              "No brnad requests found.",
              "The vendor has not requested any brands."
            );
          }
        return reqBrands;
    } catch (error) {
       throw error; 
    }
}
const upReqBrand = async(id, body,vendorName)=>{
    try {
        await checkBody(body);
        const brand = await brandQuiry.findBrandById(id);
        if (!brand) {
            throw customException.error(
              statusCode.NOT_FOUND,
              "Brand not found.",
              "The brand does not exist or the vendor does not have permission to update it."
            );
          }
          if(brand.name !== vendorName){
            throw customException.error(
                statusCode.FORBIDDEN,
                "Vendor mismatch.",
                "The vendor trying to update the brand does not own it."
              ); 
        }
        const updatedBrand = await brandQuiry.upReqBrand(id, body);
        return updatedBrand;
    } catch (error) {
        throw error;
    }
}
const delReqBrand = async(id,vendorName)=>{
    try {
        const brand = await brandQuiry.findBrandById(id);
        if (!brand) {
            throw customException.error(
              statusCode.NOT_FOUND,
              "Brand not found.",
              "The brand does not exist or the vendor does not have permission to update it."
            );
          }
          if(brand.name !== vendorName){
            throw customException.error(
                statusCode.FORBIDDEN,
                "Vendor mismatch.",
                "The vendor trying to delete the brand does not own it."
              ); 
        }
        return await brandQuiry.delReqBrand(id);
    } catch (error) {
        throw error;
    }
}
const viewAcceptBrands = async()=>{
    try {
        return await brandQuiry.findStatusAccBrand();
    } catch (error) {
        throw error; 
    }
}
module.exports = {
    addReqBrand,
    getReqBrand,
    upReqBrand,
    delReqBrand,
    viewAcceptBrands
}