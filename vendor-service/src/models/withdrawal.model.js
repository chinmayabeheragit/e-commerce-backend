const mongoose = require("mongoose");
const withdrawalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  IFSCCode: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  default: {
    type: String,
  },
  vendorName: {
    type: String,
    required: true,
  },
});
const withdrawalModel = mongoose.model("withdrawal", withdrawalSchema);
module.exports = { withdrawalModel };
