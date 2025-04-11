const storeQuery=require("../queries/vendor.store.query");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const saveStore = async(body,vendorName, session)=>{
    try {
        body.vendorName = vendorName;
        return await storeQuery.saveStore(body, session);
    } catch (error) {
       throw error; 
    }
}
const upStore = async(vendorName, id, body)=>{
    try {
        const vendor = await storeQuery.findVendor(vendorName);
        if(!vendor){
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "vendor not found",
                "vendor not found"
              );
        }
        const updatedStore = await storeQuery.upStore(id, body);
        if(!updatedStore){
            throw customException.error(
                statusCode.NOT_FOUND,
                null,
                "store not found",
                "store not found"
              );
        }
        return updatedStore;
    } catch (error) {
      throw error;  
    }
}
const getStore = async()=>{
    try {
        return await storeQuery.findAll();
    } catch (error) {
       throw error; 
    }
}
module.exports = {
    saveStore,
    upStore,
    getStore
}