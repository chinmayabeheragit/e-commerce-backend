const OrderDeliveryQuery = require('../Querys/user.delivered.order.query')
const statusCode = require("../../commons/utils/statusCode")
const customException = require("../../commons/exception/customException");

const getOrderDeliveryStatus = async (userId, orderId) => {
    try {
        const order = await OrderDeliveryQuery.getOrderByIdAndUserId(userId, orderId);
        if (!order) {
            throw customException.error(
                statusCode.NOT_FOUND,
                "Order not found.",
                "The order does not exist or the provided order ID is incorrect."
            );
        }
        const deliveryStatus = {
            orderId: order._id,
            confirmationDate: order.confirmationDate,
            shippingDate: order.shippingDate,
            outForDeliveryDate: order.outForDeliveryDate,
            deliveredDate: order.deliveredDate,
            status: order.status
        };
        return deliveryStatus;
    } catch (error) {
        throw error;
    }
};

const getInvoiceBillById = async (invoiceId) => {
    try {
        const invoiceBill = await OrderDeliveryQuery.findById(invoiceId);
        return invoiceBill;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getOrderDeliveryStatus,
    getInvoiceBillById
}