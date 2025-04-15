const mongoose = require("mongoose");
const shortId = require("shortid");
const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `PROD-A-ENQ-${shortId.generate()}`,
    },
    orderId: {
      type: String,
      default: () => `PROD-ORDER-ENQ-${shortId.generate()}`,
    },
    CustomerName: {
      type: String,
      required: true,
    },
    TotalAmount: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "picked",
        "shipped",
        "delivered",
      ],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("AdminOrderManagement", orderSchema);
module.exports = { OrderModel };
