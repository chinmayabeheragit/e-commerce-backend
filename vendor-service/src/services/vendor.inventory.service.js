const inventoryQuery=require("../queries/vendor.inventory.query");

const saveInventory = async(PID, Stocks)=>{
    try {
        return await inventoryQuery.saveInventory(PID, Stocks);
    } catch (error) {
        throw error;
    }
}
const upInventory = async(PID, Stocks)=>{
    try {
        const prod = await inventoryQuery.findProd(PID);
        return await inventoryQuery.upInventory(PID, prod.Stocks+Stocks);
    } catch (error) {
       throw error; 
    }
}
const getInventoryEachProd = async(PID)=>{
    try {
        return await inventoryQuery.findProd(PID);
    } catch (error) {
        throw error;
    }
}
module.exports = {
    saveInventory,
    upInventory,
    getInventoryEachProd,
}