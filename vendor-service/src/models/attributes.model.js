const mongoose = require("mongoose");
const shortid = require("shortid");
const attributesSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PROD-V-ATTRI-${shortid.generate()}`,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String],
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  vendorName: {
    type: String,
    required: true,
  },
});
const attributesModel = mongoose.model("Attribute", attributesSchema);
module.exports = { attributesModel };
