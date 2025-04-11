const mongoose = require('mongoose');

const forwardShipmentSchema = new mongoose.Schema({
  awb_number: 
  { 
    type: String,
     required: true,
      unique: true 
    },
  order_number:
   {
     type: String,
      required: true
     },
  product: 
  { 
    type: String,
     required: true,
      enum: ['COD', 'PPD'] 
    },
  consignee:
   {
     type: String,
      required: true 
    },
  consignee_address1:
   { 
    type: String, 
    required: true
   },
  consignee_address2:
   { 
    type: String
   },
  consignee_address3:
   {
     type: String 
    },
  destination_city: 
  { 
    type: String,
     required: true
     },
  pincode:
   {
     type: String,
      required: true 
    },
  state:
   {
     type: String, 
     required: true
     },
  mobile:
   {
     type: String,
      required: true 
    },
  telephone: 
  { 
    type: String
   },
  item_description:
   { 
    type: String,
     required: true
     },
  pieces:
   {
     type: Number,
      required: true 
    },
  collectable_value: 
  { 
    type: Number,
     default: 0 
    },
  declared_value: 
  {
     type: Number, 
     required: true 
    },
  actual_weight:
   {
     type: Number, 
     required: true 
    },
  volumetric_weight:
   {
     type: Number,
      required: true 
    },
  length:
   { 
    type: Number,
     required: true 
    },
  breadth: 
  { 
    type: Number,
     required: true
     },
  height:
   {
     type: Number,
      required: true 
    },
  pickup_name:
   {
     type: String,
      required: true
     },
  pickup_address_line1:
   { 
    type: String, 
    required: true
   },
  pickup_address_line2:
   {
     type: String
     },
  pickup_pincode:
   {
     type: String,
      required: true
     },
  pickup_phone:
   {
     type: String
     },
  pickup_mobile: 
  { 
    type: String,
     required: true
     },
  return_name:
   { 
    type: String,
     required: true
     },
  return_address_line1: 
  { 
    type: String,
     required: true
     },
  return_address_line2: 
  {
     type: String
     },
  return_pincode: 
  { 
    type: String,
     required: true
     },
  return_phone: 
  {
     type: String 
    },
  return_mobile:
   {
     type: String,
      required: true
     },
  dg_shipment:
   { 
    type: Boolean,
     default: false
     }
}, 
{ timestamps: true });

const Manifest = mongoose.model('ForwardShipment', forwardShipmentSchema);
module.exports = {Manifest}
