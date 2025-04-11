const mongoose = require("mongoose");
const shortid = require("shortid");
const AdminTransactionSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `TRANSACTION-${shortid.generate()}`,
    },
    customerName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
        required: true,
    }
})
const AdminTran = mongoose.model('Transaction', AdminTransactionSchema);
module.exports = {
    AdminTran,
}