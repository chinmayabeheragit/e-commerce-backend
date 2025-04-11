const {InventoryModel} = require("../models/inventory.model");
const saveInventory = async(body, session)=>{
    try {
        const inventory = new InventoryModel(body);
        await inventory.save(session);
        return inventory;
    } catch (error) {
        throw error;
    }
}
const upInventory = async(PID, stocks)=>{
    try {
        return await InventoryModel.findOneAndUpdate(
            { PID: PID }, 
            { Stocks: stocks }, 
            { new: true } 
        )
    } catch (error) {
        throw error;
    }
}
const findProd = async(PID)=>{
    try {
        const inventory = await InventoryModel.findOne({ PID: PID });
        return inventory;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    saveInventory,
    upInventory,
    findProd
}