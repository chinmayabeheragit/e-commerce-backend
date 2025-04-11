const mongoose = require("mongoose");

const vendorDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  storeName: {
    type: String,
    required: true,
  },
  warehouseAddress: {
    type: String,
    required: true,
  },
  bankAccountDetails: {
    accountNumber: {
      type: String,
      required: true,
    },
    IFSCCode: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
  },
  aadhar:{
     type: String,
     required: true,
     unique: true
  },
  businessPanNumber: {
    type: String,
    required: true,
    unique: true
  },
  GSTIN: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    email: {
      type: String,
    },
    vendorId: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  role: {
    type: String,
    default: "vendor",
  },
});

const vendorDetailsModel = mongoose.model(
  "Vendor_Details",
  vendorDetailsSchema
);

module.exports = { vendorDetailsModel };
