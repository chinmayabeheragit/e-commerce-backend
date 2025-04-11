const mongoose = require("mongoose");
const shortid = require("shortid");

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `KIDTRYZ-ORDER-ENQ-${shortid.generate()}`,
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
    },
    status: {
      type: String,
      enum: [
        "confirmed",
        "processing",
        "picked",
        "shipped",
        "delivered",
        "cancel",
        "return",
        "request",
      ],
      default: "request",
    },
    paid: {
      type: Boolean,
      default: false, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    productDetails: {
      type: Object,
    },
    email: {
      type: String,
    },
    awbNumber: {
      type: String,
    },
    productId: {
      type: String,
    },
    addressId:
    {
     type:String
    },
    itemPrice: {
      type: Number,
    },
    deliveryCharges: {
      type: Number,
      required: true,
    },
    cartId: {
      type: String, 
    },
    vendorEmail: {
      type:String,
    }
    
  }
);

const OrderModel = mongoose.model("Orders", orderSchema);
module.exports = { OrderModel };
