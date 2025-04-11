const orderDeliveredModel = require('../Models/user.delivered.order.model')
const getOrderByIdAndUserId = async (userId, orderId) => {
    try {
        return await orderDeliveredModel.findOne({ _id: orderId, userId });
    } catch (error) {
        throw error;
    }
};
const findById = async (invoiceId) => {
    try {
        const invoiceBill = await orderDeliveredModel.findById(invoiceId);
        return invoiceBill;
    } catch (error) {
        throw new Error('Failed to find invoice bill by ID');
    }
};
module.exports = {
    getOrderByIdAndUserId,
    findById
}