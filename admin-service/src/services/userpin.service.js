const Pinquery = require("../queries/userpin.query");
const addpin = async(body, session) => {
    try {
        const {
            pincode
        } = body
        const data = {
            pincode
        };
        const isValidPinCode = (pinCode) => {
            const isValid = /^\d{6}$/.test(pinCode);
            return isValid;
        };
        if (!isValidPinCode(pincode)) {
            throw new Error("Pincode must be 6 digits long and numeric.");
        }
        const result = await Pinquery.createpin(data, session);
        return result;
    } catch (error) {
        throw error;
    }
};
const get_pin = async(pincode, body) => {
    try {
        const pin = await Pinquery.findpin(pincode, body);
        return pin;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addpin,
    get_pin
}