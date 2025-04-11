const {OrderModel} = require('../models/ordermanagement.model')
const {ConfirmOrderModel} = require('../models/confirmOrder.model')

const viewallorders = async (page = 1, pageSize = 8) => {
    try {
      const skip = (page - 1) * pageSize;
      return await ConfirmOrderModel.find().skip(skip).limit(pageSize);
    } catch (error) {
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, status, updatedOrder) => {
    try {
        const result = await OrderModel.findOneAndUpdate(
            { _id: orderId },
            {
                $set: {
                    status: status, ...
                    updatedOrder
                }
            },
            { new: true }
        );
        return result;
    } catch (error) {
        throw error;
    }
};
const updatePaidStatus = async (confirmOrderId, paid) => {
  try {
    console.log(`Updating paid status for Confirm Order ID: ${confirmOrderId} to ${paid}`); // Logging added
    
    const updatedOrder = await ConfirmOrderModel.findOneAndUpdate(
      { _id: confirmOrderId },  // Using _id here for the Confirm Order ID
      { $set: { paid } }, 
      { new: true } 
    );
    
    return updatedOrder;
  } catch (error) {
    console.error(error); // Add logging here
    throw error;
  }
};

const fetchPaidOrders = async () => {
  try {
    const paidOrders = await ConfirmOrderModel.find({ paid: true });
    return paidOrders;
  } catch (error) {
    console.error(error); // Add logging here
    throw error;
  }
};


  module.exports = {
    viewallorders,
    updateOrderStatus,
    updatePaidStatus,
    fetchPaidOrders
  }