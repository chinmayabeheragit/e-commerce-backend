const mongoose = require("mongoose");
const shortid = require('shortid');
const storeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `KIDTRYZ-V-STORE-${shortid.generate()}`,
  },
  storeLogo: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  GSTNumber: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
  },
  vendorName: {
    type: String,
    required: true,
  },
});

const storeModel = mongoose.model("VendorStore", storeSchema); 
module.exports = { storeModel };
