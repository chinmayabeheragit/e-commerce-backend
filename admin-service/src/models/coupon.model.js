const mongoose = require("mongoose");
const shortid = require('shortid');
const ProductSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `COUPON-${shortid.generate()}`,
    },
    title: {
        type: String,
        required: true
    },
    vouchercode: {
        type: String,
        default: () => `VOUCHER-${shortid.generate()}`,
        sparse: true
    },
    price: {
        type: Number,
        required: true
    },
    cappedPrice: {
        type: Number,
        required: true,
    },
    minSpent: {
        type: Number,
        required: true,
    },
    usageLimit: {
        type: Number,
        required: true,
    },
    limitPerCustomer: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Flat Discount', 'Percentage Discount', 'Closed'],
        required: true
    }
});

const productCustomer = mongoose.model('CouponProduct', ProductSchema);

module.exports = {
    productCustomer
}
