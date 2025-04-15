const mongoose = require("mongoose");
const shortId = require("shortid");

const addressSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `PROD-ADDRESS-ENQ-${shortId.generate()}`,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
      
    },
    pinCode: {
      type: Number,  
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
      required: true,
      unique:true
    },
    email: {
      type: String,
    },
  }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address };
