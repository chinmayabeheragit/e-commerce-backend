const mongoose = require('mongoose');

const ShipmentCancellationSchema = new mongoose.Schema({
  awbNumber: { type: String, required: true },
  cancellationReason: { type: String, required: true },
  cancelledBy: { type: String, required: true },
  cancelledAt: { type: Date, required: true },
  updatedAt: { type: Date },
}, { timestamps: true });

const ShipmentCancellation = mongoose.model('ShipmentCancellation', ShipmentCancellationSchema);

module.exports = {ShipmentCancellation};
