const mongoose = require("mongoose");
const PincodeSchema = new mongoose.Schema({
    pincode: {
        type: Number,
        required: true
    }
});
const PincodeModel = mongoose.model('pincode', PincodeSchema);
module.exports = {
    PincodeModel,
}