const mongoose = require('mongoose');
const shortid = require('shortid');

const confirmOrderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `KIDTRYZ-CONFIRM-ORDER-${shortid.generate()}`,
  },
  orderId: {
    type: String,
    required: true,
    ref: 'Orders'
  },
  CustomerName: {
    type: String,
    required: true
  },
  TotalAmount: {
    type: Number,
    required: true
  },
  Quantity: {
    type: Number,
  },
  paid: {
    type: Boolean,
    default: false  // Order marked as paid when stored in this schema
  },
  status: {
    type: String,
    enum: [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Returned"
    ],
    default: "Order Placed"
  },
  productDetails: {
    type: Object, 
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  email:{
    type:String
  }
});

const ConfirmOrderModel = mongoose.model("ConfirmOrder", confirmOrderSchema);
module.exports = { ConfirmOrderModel };
