const orderQuery = require('../Querys/user.ordermanagementQuery')
const getOngoingOrderById = async (orderId) => {
    try {
        const ongoingOrder = await orderQuery.findOngoingOrderById(orderId);
        return ongoingOrder;
    } catch (error) {
        throw error;
    }
};
const shareOrderDetails = async (orderId) => {
    try {
        const order = await orderQuery.shareOrderDetails(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        const productIds = order.products.map(product => product.productId);
        const products = await orderQuery.shareOrderDetails(productIds);
        return { order, products };
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getOngoingOrderById,
    shareOrderDetails
}