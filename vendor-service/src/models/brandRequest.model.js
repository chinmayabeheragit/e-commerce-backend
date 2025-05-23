const mongoose = require("mongoose");
const shortid = require("shortid");
const brandReqSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `BRAND-${shortid.generate()}`
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
  },
  featured: {
    type: String,
  },
  status: {
    type: String,
    enum: ["accept", "reject", "request"],
    default: "request",
  },
  name: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
const brandReqModel = mongoose.model("Brand", brandReqSchema);
module.exports = { brandReqModel };
