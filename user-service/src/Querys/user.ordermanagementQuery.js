const { OrderModel } = require('../Models/user.ordermanagement.model')
const {Manifest} =  require('../Models/manifest.model')
const {NDRData} = require('../Models/ndr.model')
const {ShipmentCancellation} = require('../Models/shipmentCancellation.model')
const {ConfirmOrderModel} = require('../Models/confirmation.model')

const ViewAllOrders = async () => {
    try {
        return await OrderModel.find()
    } catch (error) {
        throw error
    }
}
const viewCnfOrder = async () => {
  try {
      return await ConfirmOrderModel.find()
  } catch (error) {
      throw error
  }
}
const findById = async (Order_Id) => {
    try {
        return await OrderModel.findById(Order_Id);
    } catch (error) {
        throw error;
    }
};
const addOrder = async (orderData, session) => {
  try {
    const order = new OrderModel(orderData);
    const result = await order.save({ session });
    return result;
  } catch (error) {
    throw error;
  }
};
const updateOrderStatus = async (awbNumber, status) => {
  try {
    const updatedOrder = await OrderModel.findOneAndUpdate({ awbNumber }, { status }, { new: true });
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};
const checkPermissionToUpdateOrderStatus = async (Order_Id, userName) => {
    try {
        const order = await OrderModel.findOne({ _id: Order_Id, email: userName });
        return !!order;
    } catch (error) {
        throw error;
    }
};


const findOngoingOrderById = async (Order_Id) => {
    try {
        return await OrderModel.findById(Order_Id);
    } catch (error) {
        throw error;
    }
};

const shareOrderDetails = async (Order_Id) => {
    try {
        const order = await OrderModel.findById(Order_Id);
        if (!order) {
            throw new Error('Order not found');
        }
        const productIds = order.products.map(product => product.productId);
        const products = await OrderManagementQuery.getProductsByIds(productIds);
        return { order, products };
    } catch (error) {
        throw error;
    }
};

const createShipment = async (shipmentData) => {
  try {
    const newShipment = new Manifest(shipmentData);
    await newShipment.save();
    return newShipment;
  } catch (error) {
    throw error;
  }
};
  

  const createOrUpdateNDRData = async (data, session) => {
    const { awbNumber, ...updateData } = data;
  
    let ndrData = await NDRData.findOne({ awbNumber }).session(session);
  
    if (ndrData) {
      ndrData.set(updateData);
      ndrData.updatedAt = new Date();
      return await ndrData.save({ session });
    } else {
      return await NDRData.create([data], { session });
    }
  };
  const createOrUpdateShipmentCancellation = async (data, session) => {
    const { awbNumber, ...updateData } = data;
  
    let shipmentCancellation = await ShipmentCancellation.findOne({ awbNumber }).session(session);
  
    if (shipmentCancellation) {
      shipmentCancellation.set(updateData);
      shipmentCancellation.updatedAt = new Date();
      return await shipmentCancellation.save({ session });
    } else {
      return await ShipmentCancellation.create([data], { session });
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const order = await OrderModel.findById(orderId);
      return order;
    } catch (error) {
      throw error;
    }
  };
  
  const updateOrderQuantity = async (orderId, quantity) => {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { Quantity: quantity },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };

  const ViewOrdersByUserEmail = async (email) => {
    try {
      return await OrderModel.find({ email: email });
    } catch (error) {
      throw error;
    }
  };

  const updateOrderAsPaid = async (orderId) => {
    return await OrderModel.findByIdAndUpdate(
      orderId,
      { paid: true, status: "confirmed" },
      { new: true }
    );
  };

  const saveConfirmedOrder = async (orderDetails) => {
    let productDetails;
  
    if (Array.isArray(orderDetails.productDetails)) {
      for (let product of orderDetails.productDetails) {
        const confirmOrder = new ConfirmOrderModel({
          orderId: orderDetails._id,
          CustomerName: orderDetails.CustomerName,
          TotalAmount: product.productDetails.regularPrice,  
          Quantity: 1,  
          paid: true,
          status: "Order Placed",
          email: orderDetails.email,
          productDetails: product.productDetails,  // Save individual product details
        });
        await confirmOrder.save();
      }
    } else {
      productDetails = orderDetails.productDetails;
  
      const confirmOrder = new ConfirmOrderModel({
        orderId: orderDetails._id,
        CustomerName: orderDetails.CustomerName,
        TotalAmount: orderDetails.TotalAmount,
        Quantity: orderDetails.Quantity,
        paid: true,
        status: "Order Placed",
        email: orderDetails.email,
        productDetails: productDetails,  // Save single product details
      });
      await confirmOrder.save();
    }
  
    return true;
  };
  
  
module.exports = {
    ViewAllOrders,
    findById,
    addOrder,
    updateOrderStatus,
    checkPermissionToUpdateOrderStatus,
    findOngoingOrderById,
    shareOrderDetails,
    createShipment,
    createOrUpdateNDRData,
    createOrUpdateShipmentCancellation,
    updateOrderQuantity,
    getOrderById,
    ViewOrdersByUserEmail,
    updateOrderAsPaid,
    saveConfirmedOrder,
    viewCnfOrder
}