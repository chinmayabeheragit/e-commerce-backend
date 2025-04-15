const mongoose = require("mongoose");
const shortid = require("shortid");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PROD-V-PROD-${shortid.generate()}`,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
  },
  age: {
    type: String,
    required: true,
    enum: ["0-6", "6-12", "12-18", "18-24", "24+"],
  },
  description: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  kidztryzCoins: {
    type: Number,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  productType: {
    type: String,
  },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock", "Limited Stock"],
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
  alreadySold: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: true,
  },
  video: {
    type: String
 },
  attribute: {
    type: String,
  },
  subAttributes: {
    type: [String],
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL"],
  },
  weight: {
    type: String,
  },
  vendorName: {
    type: String,
    required: true,
  },
});

productSchema.pre("save", function (next) {
  this.category = this.category.toLowerCase();
  this.subCategory = this.subCategory.map(subCat => subCat.toLowerCase());
  next();
});

const productManagementModel = mongoose.model("Product", productSchema);

module.exports = {
  productManagementModel,
};
