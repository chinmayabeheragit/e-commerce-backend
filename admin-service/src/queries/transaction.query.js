const { AdminTran } = require('../models/transaction.model');
const createtranlsaction = async(data, session) => {
        try {
            const transaction = await new AdminTran(data);
            await transaction.save(session);
            return transaction;
        } catch (error) {
            throw error;
        }
    }
const findAllTransaction = async() => {
    try {
        const result = await AdminTran.find();
        return result;
    } catch (error) {
        throw error;
    }
};
const findTransactionById = async(transactionId) => {
    try {
        const transaction = await AdminTran.findById({
            _id: transactionId,
            status: true
        });
        return transaction;
    } catch (error) {
        throw error;
    }
};
const viewProdTrans = async(page = 1, pageSize = 8) => {
    try {
        const skip = (page - 1) * pageSize;
        const products = await AdminTran.find().skip(skip).limit(pageSize);
        return products;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createtranlsaction,
    findAllTransaction,
    findTransactionById,
    viewProdTrans
}