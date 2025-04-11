const mongoose = require("mongoose");
const shortId = require("shortid");
const WishlistItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `KIDTRYZ-WISHLIST-ENQ-${shortId.generate()}`,
      unique: true
    },
    productDetails: {
      type: Object,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  }
);
const WishListItemModel = mongoose.model("WishList", WishlistItemSchema);
module.exports = { WishListItemModel };
