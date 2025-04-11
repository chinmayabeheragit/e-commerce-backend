const mongoose = require("mongoose");
const shortid = require("shortid");
const vendorSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `KIDTRYZ-A-VEND-${shortid.generate()}`,
  },
    Name: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  GST: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active',
    enum: ['active', 'inactive']
  }
});
const VendorModel = mongoose.model("Vendor", vendorSchema);
module.exports = {
  VendorModel,
};