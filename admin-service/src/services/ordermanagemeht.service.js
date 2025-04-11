const OrderManagementQuery = require('../queries/ordermanagement.query')

//view all orders
const viewallorders = async (page, pageSize) => {
    try {
      return await OrderManagementQuery.viewallorders(page, pageSize);
    } catch (error) {
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
        if (!Object.values(OrderStatus).includes(status)) {
            throw new Error('Invalid status provided');
        }
        const updatedOrder = await OrderManagementQuery.updateOrderStatus(
            { _id: orderId },
            { status: status },
            { new: true }
        );
        if (!updatedOrder) {
            throw new Error('Order not found');
        }

        return updatedOrder;
    } catch (error) {
        throw error;
    }
};
const updatePaidStatus = async (confirmOrderId, paid) => {
  try {
    console.log(`Updating paid status for Confirm Order ID: ${confirmOrderId} to ${paid}`); // Logging added
    return await OrderManagementQuery.updatePaidStatus(confirmOrderId, paid);
  } catch (error) {
    console.error(error); // Add logging here
    throw error;
  }
};

const getPaidOrders = async () => {
  try {
    return await OrderManagementQuery.fetchPaidOrders();
  } catch (error) {
    console.error(error); // Add logging here
    throw error;
  }
};



  module.exports = {
    viewallorders,
    updateOrderStatus,
    updatePaidStatus,
    getPaidOrders
  }