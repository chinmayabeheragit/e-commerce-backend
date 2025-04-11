const mongoose = require('mongoose');

const NDRDataSchema = new mongoose.Schema({
  awbNumber: { type: String, required: true },
  ndrDetails: { type: Object, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
}, { timestamps: true });

const NDRData = mongoose.model('NDRData', NDRDataSchema);

module.exports = {NDRData};
