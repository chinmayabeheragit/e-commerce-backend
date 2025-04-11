const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const couponQuery = require("../queries/coupon.query");
const checkBody = async (body) => {
  try {
    if (Object.keys(body).length === 0) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Request body is empty.",
        "The request body cannot be empty."
      );
    }
    return body;
  } catch (error) {
    throw error;
  }
};
const checkCouponById = async (id) => {
  try {
    const coupon = await couponQuery.viewCouponbyid(id);
    if (!coupon) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Coupon not found.",
        "No coupon exists with the specified ID."
      );
    }
    return coupon;
  } catch (error) {
    throw error;
  }
};
const addcouponProduct = async (body, session) => {
  try {
    await checkBody(body);
    const savedCoupon = await couponQuery.createcoupon(body, session);
    return savedCoupon;
  } catch (error) {
    throw error;
  }
};
const getCoupon = async () => {
  try {
    const coupons = await couponQuery.viewallcoupon();
    if (coupons.length <= 0 || !coupons) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Coupons not found.",
        "No coupons are available with the specified criteria."
      );
    }

    return coupons;
  } catch (error) {
    throw error;
  }
};
const getCouponByVoucherCode = async (voucherCode) => {
  try {
    const coupon = await couponQuery.checkCouponByVoucherCode(voucherCode);
    if(coupon.length <= 0){
      throw customException.error(
        statusCode.NOT_FOUND,
         "Coupons not found.",
        "No coupons are available with the specified voucher code."
      );
    }
    return coupon;
  } catch (error) {
    throw error;
  }
};
const viewCouponbyid = async (customId) => {
  try {
    const getid = couponQuery.viewvoucherid(customId);
    return getid;
  } catch (error) {
    throw error;
  }
};
const updateProduct = async (couponId, body) => {
  try {
    await checkCouponById(couponId);
    const updatedCoupon = await couponQuery.updateCustomerById(couponId, body);
    return updatedCoupon;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (couponId) => {
  try {
    await checkCouponById(couponId)
    const deltedCoupon = await couponQuery.deleteCustomerById(couponId);
    return deltedCoupon;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  viewCouponbyid,
  updateProduct,
  deleteProduct,
  getCouponByVoucherCode,
  addcouponProduct,
  getCoupon,
  checkCouponById
};
