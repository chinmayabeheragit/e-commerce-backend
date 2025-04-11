const { PincodeModel } = require("../models/userpin.model");
const createpin = async(data, session) => {
        try {
            const pin = await new PincodeModel(data);
            await pin.save(session);
            return pin;
        } catch (error) {
            throw error;
        }
    }
const findpin = async(pincode) => {
    try {
        const result = await PincodeModel.find({ pincode });
        return result;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    findpin,
    createpin
}