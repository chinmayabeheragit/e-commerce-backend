const { ConfirmOrderModel } = require('../models/confirm.model');


  const updateStatusById = async (confirmOrderId, newStatus)  =>{
    try {
      const updatedOrder = await ConfirmOrderModel.findByIdAndUpdate(
        confirmOrderId,
        { status: newStatus },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }

  const findPaidOrdersByVendor = async (vendorEmail) => {
    try {
      return await ConfirmOrderModel.find({
        "productDetails.vendorName": vendorEmail, // Match vendor email in product details
        paid: true, // Only show paid orders
      });
    } catch (error) {
      throw error;
    }
  };

  const getOrderByConfirmOrderId = async (confirmOrderId) => {
    try {
      return await ConfirmOrderModel.findOne({ _id: confirmOrderId });
    } catch (error) {
      throw error;
    }
  };
  
  // Function to update order status by confirmOrderId
  const updateOrderStatus = async (confirmOrderId, status) => {
    try {
      const updatedOrder = await ConfirmOrderModel.findOneAndUpdate(
        { _id: confirmOrderId },
        { $set: { status } },
        { new: true }
      );
  
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };
  
  

module.exports = 
{findPaidOrdersByVendor,
    updateStatusById,
    getOrderByConfirmOrderId,
    updateOrderStatus
};
