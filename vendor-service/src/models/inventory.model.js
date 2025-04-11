const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  PID: {
    type: String,
    required: true,
  },
  Stocks: {
    type: Number,
    default: 0,
  },
  SoldProducts: {
    type: Number,
    default: 0,
  },
});
const InventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = { InventoryModel };
