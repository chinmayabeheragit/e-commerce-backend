const mongoose = require("mongoose");
const shortId = require("shortid");

const cartItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `PROD-CART-ENQ-${shortId.generate()}`,
    },
    products: [
      {
        productDetails: {
          type: Object,
          required: true,
        },
      },
    ],
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CartItemModel = mongoose.model("CartItems", cartItemSchema);

module.exports = { CartItemModel };

