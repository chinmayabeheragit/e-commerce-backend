const mongoose = require("mongoose");
const shortid = require("shortid");
const CustomerAdminSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `CUSTOMERID-${shortid.generate()}`,
    },
    customername: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
    },
    email: {
        type: String,
    }
})
const AdminCustomer = mongoose.model('Customer', CustomerAdminSchema);
module.exports = {
    AdminCustomer
}