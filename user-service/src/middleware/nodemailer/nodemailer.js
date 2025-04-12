const nodemailer = require("nodemailer");

const sendMail = async (getEmail, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_PASS,
            to: getEmail,
            subject: subject,
            html: message,
        });
    } catch (error) {
        throw error
    }
}

module.exports = sendMail


