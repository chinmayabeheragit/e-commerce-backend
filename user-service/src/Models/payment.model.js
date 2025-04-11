
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  paymentId:
   { 
    type: String,
     required: true 
    },
  amount: {
     type: Number,
      required: true
     },
  currency: {
     type: String,
      required: true
     },
  status:
   { type: String,
     required: true
     },
  createdAt: { 
    type: Date, 
    default: Date.now 
},
  updatedAt: { 
    type: Date
 }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {Transaction};
