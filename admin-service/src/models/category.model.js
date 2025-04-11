const mongoose = require("mongoose");
const shortid = require("shortid");
const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `KIDTRYZ-A-ADMIN-cate-${shortid.generate()}`,
  },
  cat_name: {
    type: String,
    required: true,
    unique: true
  },
  subcategories: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accept", "reject", "request"],
    default: "accept",
  },
  name: {
    type: String,
    default: 'admin'
  },
});
const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = {
  CategoryModel,
};
