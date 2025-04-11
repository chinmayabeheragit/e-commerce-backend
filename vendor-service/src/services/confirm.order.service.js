const confirmOrderQuery = require('../queries/confirm.order.query');
const customException = require('../../commons/exception/customException')
const statusCode = require('../../commons/utils/statusCode')

const viewPaidOrdersByVendor = async (vendorEmail) => {
  try {
    return await confirmOrderQuery.findPaidOrdersByVendor(vendorEmail);
  } catch (error) {
    throw error;
  }
};

const updateOrderStatus = async (confirmOrderId, status) => {
  try {
    const order = await confirmOrderQuery.getOrderByConfirmOrderId(confirmOrderId);

    if (!order) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "order not retrived",
        "order not found"
      )
    }

    const updatedOrder = await confirmOrderQuery.updateOrderStatus(confirmOrderId, status);
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

const addAwbToConfirmOrder = async (confirmOrderId, awbNumber, vendorName) => {
  try {
    const order = await confirmOrderQuery.getOrderByConfirmOrderId(confirmOrderId);

    if (!order) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "order not retrived",
        "order not found"
      )
    }

    if (order.vendorName !== vendorName) {
      throw { errorCode: statusCode.FORBIDDEN, message: "Not authorized to update this order" };
    }
    order.awbNumber = awbNumber;
    await order.save();

    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = 
{ viewPaidOrdersByVendor,
  updateOrderStatus,
  addAwbToConfirmOrder
 };


