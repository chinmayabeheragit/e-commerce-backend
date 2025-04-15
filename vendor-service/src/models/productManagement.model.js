const mongoose = require("mongoose");
const shortid = require("shortid");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PROD-${shortid.generate()}`, // Generic ID prefix
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
  ageGroup: {
    type: String,
    enum: ["0-6", "6-12", "12-18", "18-24", "24+"], // Keep if age-based products needed
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
    min: 1,
    max: 100, // Broadened to be fully generic
  },
  loyaltyPoints: { // Generic name instead of org-specific
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
  attribute: {
    type: String,
  },
  subAttributes: {
    type: [String],
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL"], // Added XS for more options
  },
  weight: {
    type: String,
  },
  vendorId: { // Changed from vendorName to vendorId for better DB normalization
    type: String,
  },
});

productSchema.pre("save", function (next) {
  if (this.category) {
    this.category = this.category.toLowerCase();
  }
  if (Array.isArray(this.subCategory)) {
    this.subCategory = this.subCategory.map(subCat => subCat.toLowerCase());
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
};
