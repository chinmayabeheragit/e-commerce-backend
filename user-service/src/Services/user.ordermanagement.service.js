const OrderManagementQuery = require("../Querys/user.ordermanagementQuery");
const axios = require('axios');
const FormData = require('form-data');
const customException = require('../../../common-libs/exception/customException')
const StatusCode = require('../../../common-libs/utils/statusCode')
const ProductQuery = require('../Querys/vendor.product.query')
const xml2js = require('xml2js');
const CartManagementQuery = require('../Querys/user.cartmanagement.query')
const AddressManagementQuery = require("../Querys/user.addressmanagement.query");


require('dotenv').config();


const addSingleProductOrder = async (body, productId, addressId, userName, session) => {
  try {
    body.CustomerName = body.CustomerName || userName;
    body.email = body.email || userName;

    const productDetails = await ProductQuery.getProductById(productId, session);

   if(!productDetails){
    throw customException.error(
      StatusCode.NOT_FOUND,
      "product details not found",
      "no product details found by this item id"
    )
   }
   const addressDetails = await AddressManagementQuery.getAddressById(addressId, session);  
   if (!addressDetails) {
     throw customException.error(
       StatusCode.NOT_FOUND,
       "Address details not found",
       "No address details found for this address ID"
     );
   }

    const { regularPrice, discountPercentage } = productDetails;
    const discountAmount = (regularPrice * discountPercentage) / 100;
    const discountedPrice = regularPrice - discountAmount;

    const itemTotal = discountedPrice + (body.deliveryCharges || 0);

    if (isNaN(itemTotal)) {
      throw new Error("Calculated item total is not a number");
    }

    body.TotalAmount = itemTotal;

    body.productDetails = {
      ...productDetails.toObject(),
    };

    const order = await OrderManagementQuery.addOrder({
      ...body,
      productDetails: body.productDetails,
    }, session);

    return {
      ...order.toObject(),
      email: body.email,  
      CustomerName: body.CustomerName,  
    };
  } catch (error) {
    throw error;
  }
};


const addCartProductOrder = async (cartId,addressId,userName,customerName, session) => {
  try {
      const cartDetails = await CartManagementQuery.getCartById(cartId, session);
    
   if(!cartDetails){
    throw customException.error(
      StatusCode.NOT_FOUND,
      "cart details not found",
      "no cart details found by this item id"
    )
   }
   const addressDetails = await AddressManagementQuery.getAddressById(addressId, session);  
   if (!addressDetails) {
     throw customException.error(
       StatusCode.NOT_FOUND,
       "Address details not found",
       "No address details found for this address ID"
     );
   }
      const CustomerName = cartDetails.CustomerName || customerName;
    
      if (!CustomerName) {
        throw new Error("Customer name is required");
      }

      const totalAmount = cartDetails.products.reduce((total, product) => {
          const { regularPrice, discountPercentage } = product.productDetails;

          const discountedPrice = regularPrice - (regularPrice * (discountPercentage || 0) / 100);
          return total + discountedPrice;
      }, 0);

      const deliveryCharges = cartDetails.products.reduce((total, product) => total + (product.deliveryCharges || 0), 0);
      
      const orderDetails = {
          CustomerName,
          email: cartDetails.email || userName,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: cartDetails.products.map(product => product.productDetails),
          deliveryCharges,
          TotalAmount: totalAmount + deliveryCharges, 
          cartId, 
          addressId,
          productDetails: cartDetails.products ,
      };

      const order = await OrderManagementQuery.addOrder(orderDetails, session);
      return order;
  } catch (error) {
      throw error;
  }
};



const updateOrderStatus = async (awbNumber, currentStatus) => {
  let status = "pending";
  if (currentStatus === "In Transit") {
    status = "shipped";
  } else if (currentStatus === "Out for Delivery") {
    status = "out for delivery";
  } else if (currentStatus === "Delivered") {
    status = "delivered";
  }

  const updatedOrder = await OrderManagementQuery.updateOrderStatus(awbNumber, status);
  return updatedOrder;
};

const cancelOrder = async (orderId) => {
  try {
    const order = await OrderManagementQuery.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status === "cancelled" || order.status === "returned") {
      throw new Error("Order is already cancelled or returned");
    }
    order.status = "cancelled";
    await order.save();
  } catch (error) {
    throw error;
  }
};
const returnOrder = async (orderId) => {
  try {
    const order = await OrderManagementQuery.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status === "cancelled" || order.status === "returned") {
      throw new Error("Order is already cancelled or returned");
    }
    order.status = "returned";
    await order.save();
  } catch (error) {
    throw error;
  }
};
const getAllOrders = async (email) => {
  try {
    const orders = await OrderManagementQuery.ViewOrdersByUserEmail(email);
    return orders;
  } catch (error) {
    throw error;
  }
};

const viewCnfOrder = async (email) => {
  try {
    const orders = await OrderManagementQuery.viewCnfOrder(email);
    return orders;
  } catch (error) {
    throw error;
  }
};


const trackShipment = async (awbNumber) => {
  try {
    const API_USERNAME = process.env.ECOM_USERNAME;
    const API_PASSWORD = process.env.ECOM_PASS;
    if (!API_USERNAME || !API_PASSWORD) {
      throw new Error('API Username or Password is not defined');
    }

    const API_URL = `https://plapi.ecomexpress.in/track_me/api/mawbd/?awb=${awbNumber}`;
    const auth = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      timeout: 60000,
      responseType: 'text'
    });

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    console.log("Parsed XML response:", JSON.stringify(result, null, 2));

    if (result && result['ecomexpress-objects'] && result['ecomexpress-objects'].awb && result['ecomexpress-objects'].awb.length > 0) {
      const trackingInfo = result['ecomexpress-objects'].awb[0];
      return {
        awbNumber: trackingInfo.awbNumber[0],
        current_status: trackingInfo.current_status[0],
        details: trackingInfo
      };
    } else {
      console.error("No tracking information found:", JSON.stringify(result, null, 2));
      throw customException.error(
        StatusCode.NOT_FOUND,
        null,
        'Tracking information not found'
      );
    }
  } catch (error) {
    console.error("Error in trackShipment:", error.message, error.stack);
    throw customException.error(
      StatusCode.SERVER_ERROR,
      error,
      'Error tracking shipment'
    );
  }
};



const createShipment = async (shipmentData) => {
  try {
    const newShipment = await OrderManagementQuery.createShipment(shipmentData);
    return newShipment;
  } catch (error) {
    console.error("Error in createShipment:", error.message, error.stack);
    throw customException.error(
      StatusCode.SERVER_ERROR,
      error,
      'Error creating shipment'
    );
  }
};

const updateOrderQuantity = async (orderId, quantity) => {
  try {
    const orderDetails = await OrderManagementQuery.getOrderById(orderId);
    if (!orderDetails) {
      throw customException.error(
        StatusCode.NOT_FOUND,
        "Order not found.",
        "The order does not exist or the provided order ID is incorrect."
      );
    }

    if (quantity < 3 || quantity > 5) {
      throw customException.error(
        StatusCode.BAD_REQUEST,
        "Invalid quantity.",
        "Quantity must be between 3 and 5."
      );
    }

    const updatedOrder = await OrderManagementQuery.updateOrderQuantity(orderId, quantity);
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};



const ndrData = async (body, userName, session) => {
  try {
    const ndrData = {
      ...body,
      createdBy: userName,
      createdAt: new Date(),
    };

    const result = await OrderManagementQuery.createOrUpdateNDRData(ndrData, session);

    return result;
  } catch (error) {
    throw customException.error(
      StatusCode.SERVER_ERROR,
      null,
      'Error processing NDR data'
    );
  }
};

const shipmentCancellation = async (body, userName, session) => {
  try {
    const cancellationData = {
      ...body,
      cancelledBy: userName,
      cancelledAt: new Date(),
    };

    const result = await OrderManagementQuery.createOrUpdateShipmentCancellation(cancellationData, session);

    return result;
  } catch (error) {
    console.error('Error in shipmentCancellation:', error);
    throw customException.error(
      StatusCode.SERVER_ERROR,
      null,
      'Error processing shipment cancellation'
    );
  }
};
module.exports = {
  getAllOrders,
  cancelOrder,
  returnOrder,
  addSingleProductOrder,
  updateOrderStatus,
  trackShipment,
  createShipment,
  ndrData,
  shipmentCancellation,
  updateOrderQuantity,
  addCartProductOrder,
  viewCnfOrder
};
