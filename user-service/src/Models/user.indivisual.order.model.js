const mongoose = require("mongoose");
const shortId = require("shortid");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    default: () => `KIDTRYZ-A-ENQ-${shortId.generate()}`,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const IndVisualItem = mongoose.model("IndVisualItem", cartItemSchema);
module.exports = { IndVisualItem };
