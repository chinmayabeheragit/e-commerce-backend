const {UserModel}=require("../models/login.model");

const saveAdmin = async(body, session)=>{
    try {
        const admin = await new UserModel(body);
        await admin.save(session);
        return admin;
    } catch (error) {
        throw error;
    }
}

const saveVendor = async(body, session)=>{
    try {
        const vendor = await new UserModel(body);
        await vendor.save(session);
        return vendor;
    } catch (error) {
        throw error;
    }
}
const findByEmail = async(email)=>{
    try {
        return await UserModel.findOne({ email: email });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    saveAdmin,
    saveVendor,
    findByEmail,
}