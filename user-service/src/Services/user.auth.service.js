
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserQuery = require('../Querys/user.auth.Query');
const generateAuthToken = require('../../src/middleware/token')
const customException = require('../../commons/exception/customException') 
const statusCode = require("../../commons/utils/statusCode");
const crypto = require('crypto');
const sendMail = require('../../commons/nodemailer/nodemailer')
const bcryptPassword = require("../../commons/utils/hash.password");

const register = async ({ name, email, password, mobileNumber }) => {
  try {
    const existingUser = await UserQuery.findUserByMobileNumber(mobileNumber);
    if (existingUser) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Mobile number already registered.",
        "The mobile number provided is already registered."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: hashedPassword,
      mobileNumber,
    };
    const newUser = await UserQuery.createUser(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const login = async (body) => {
  try {
    const { username, password } = body;
    const user = await UserQuery.findByEmail(username);

    if (!user) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Email is not registered. Please register your email.",
        "Email is not registered. Please register your email."
      );
    }

    const isValidCredentials = await bcrypt.compare(password, user.password);

    if (!isValidCredentials) {
      throw customException.error(
        statusCode.UN_AUTHORIZED,
        "Incorrect password.",
        "Incorrect password."
      );
    }

    const role = user.role;
    const token = await generateAuthToken.generateAuthToken(username, password, role);
    return [{ role: role, token: token }];
  } catch (error) {
    throw error;
  }
};
  const fogotPassword = async (body) => {
    try {
        let getEmail = body.email
        const getAdminDetails = await UserQuery.findByEmail(getEmail);
        if (!getAdminDetails) {
            return ({ statusCode: statusCode.UN_AUTHORIZED, message: "invalid cradantial" })
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        getAdminDetails.resetPasswordToken = resetToken;
        getAdminDetails.resetPasswordExpires = Date.now() + (15 * 60 * 1000);
        await getAdminDetails.save();
        let subject = "Password Reset";
        let message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        <a>click this link
        http://localhost:4000/rest/api/password-reset/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
        sendMail(getEmail, subject, message)
        return { success: true, message: 'Reset email sent successfully' };
    } catch (error) {
        throw error
    }
}
const userPasswordReset = async (req) => {
    const { token } = req.params;
    const { password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return { statusCode: statusCode.UN_AUTHORIZED, message: "Passwords do not match" };
    }

    const getuser = await UserQuery.updatePassword(token);

    if (!getuser) {
        return { statusCode: statusCode.SESSION_EXPIRED, message: "Session has already expired. Please note that the reset link you used is valid for one-time use only. If you need to reset your password again, please request a new reset link. Thank you!" };
    }

    if (Date.now() > getuser.resetPasswordExpires) {
        getuser.resetPasswordToken = undefined;
        getuser.resetPasswordExpires = undefined;
        await getuser.save();
        return { statusCode: statusCode.SESSION_EXPIRED, message: "Reset link has expired. Please request a new reset link." };
    }

    const hashedPassword = await bcryptPassword.encryptPassword(password);
    getuser.password = hashedPassword;
    getuser.resetPasswordToken = undefined;
    getuser.resetPasswordExpires = undefined;
    await getuser.save();
    
    return { success: true, message: "Your password has been successfully updated. Please note that the reset link you used is valid for one-time use only. If you need to reset your password again, please request a new reset link. Thank you!" };
};

module.exports = {
    register,
    login,
    fogotPassword,
    userPasswordReset,
    
};
