const transactionQuery = require('../queries/transaction.query');
const addtransaction = async(body, session) => {
    try {
        return await transactionQuery.createtranlsaction(body, session); 
    } catch (error) {
        throw error;
    }
};
const getTransaction = async() => {
    try {
        const result = await transactionQuery.findAllTransaction();
        return result;
    } catch (error) {
        throw error;
    }
};
const getTransactionbyid = async(transactionId) => {
    try {
        const getid = transactionQuery.findTransactionById(transactionId)
        return getid;
    } catch (err) {
        throw err;
    }
};
const getAllTrans = async(page, pageSize) => {
    try {
        const products = await transactionQuery.viewProdTrans(page, pageSize);
        return products;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    addtransaction,
    getTransaction,
    getTransactionbyid,
    getAllTrans
}