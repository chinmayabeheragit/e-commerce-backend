const { Auth } = require("../Models/user.auth.Models");
const findByEmail = async (email) => {
    try {
        const user = await Auth.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

const login = async ({ email }) => {
    try {
        const user = await Auth.findUserByEmail({ email });
        return user;
    } catch (error) {
        throw error;
    }
};
const forgetPassword = async ({ email }) => {
    try {
        const user = await Auth.findUserByEmail({ email });
        return user;
    } catch (error) {
        throw error;
    }
};
const updatePassword = async (resetPasswordToken) => {
    try {
        const data = await Auth.findOne({ resetPasswordToken: resetPasswordToken });
        return data;
    } catch (error) {
        throw error;
    }
};
const getAdminByResetToken = async (resetPasswordToken) => {
    try {
        await adminModel.findOne({ resetPasswordToken: resetPasswordToken })
    } catch (error) {
        throw error
    }
}
const findUserByMobileNumber = async (mobileNumber) => {
    return await Auth.findOne({ mobileNumber });
  };
  
  const createUser = async (userData) => {
    const newUser = new Auth(userData);
    return await newUser.save();
  };
module.exports = {
    findByEmail,
    createUser,
    login,
    forgetPassword,
    updatePassword,
    getAdminByResetToken,
    findUserByMobileNumber
};
