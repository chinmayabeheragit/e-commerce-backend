
const Transaction = require('../Models/payment.model');

const saveTransaction = async (transactionData) => {
  const transaction = new Transaction({
    paymentId: transactionData.paymentId,
    amount: transactionData.amount,
    currency: transactionData.currency,
    status: transactionData.status,
  });
  await Transaction.save();
};

const updateTransaction = async (webhookData) => {
  const transaction = await Transaction.findOne({ paymentId: webhookData.paymentId });
  if (transaction) {
    transaction.status = webhookData.status;
    transaction.updatedAt = new Date();
    await Transaction.save();
  }
};

module.exports = {
  saveTransaction,
  updateTransaction,
};
