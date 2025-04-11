const { productCustomer } = require("../models/coupon.model");
const createcoupon = async (coupondata, session) => {
  try {
    const coupon = await new productCustomer(coupondata);
    await coupon.save(session);
    return coupon;
  } catch (error) {
    throw error;
  }
};
const viewallcoupon = async () => {
  try {
    const getcoupon = await productCustomer.find();
    return getcoupon;
  } catch (error) {
    throw error;
  }
};
const checkCouponByVoucherCode = async (vouchercode) => {
  try {
    const getCoupon = await productCustomer.find({ vouchercode:vouchercode });
    return getCoupon;
  } catch (error) {
    throw error;
  }
};
const viewCouponbyid = async (id) => {
  try {
    const coupon = await productCustomer.findById(id);
    return coupon;
  } catch (error) {
    throw error;
  }
};
const updateCustomerById = async (couponId, body) => {
  try {
    const updatedCoupon = await productCustomer.findByIdAndUpdate(couponId, body, { new: true });
    return updatedCoupon;
  } catch (error) {
    throw error;
  }
};
const deleteCustomerById = async (couponId) => {
  try {
    const deletedCoupon = await productCustomer.findByIdAndDelete(couponId);
    return deletedCoupon;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createcoupon,
  viewallcoupon,
  checkCouponByVoucherCode,
  viewCouponbyid,
  deleteCustomerById,
  updateCustomerById,
};
