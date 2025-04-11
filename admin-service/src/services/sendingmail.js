const nodemailer = require('nodemailer')
require('dotenv').config()


const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });
const sendWelcomeEmail = async(email, name)=>{
    try{    transporter.sendMail({
        
        from:{ 
            name: 'KIDTRYZ',
          address: process.env.USER
        },
        to: email,
        subject: 'Thanks for joining as Vendor of KIDTRYZ',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    }) }catch (error) {
                console.log(error)
            }


}
const sendWelcomeEmailToVendor = async (email, name, vendorId, password) => {
  try {
    await transporter.sendMail({
      from: {
        name: 'KIDTRYZ',
        address: process.env.USER
      },
      to: email,
      subject: 'Welcome to KIDTRYZ as a Vendor!',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to KIDTRYZ, ${name}!</h2>
          <p>We are excited to have you onboard as one of our valued vendors. Here are your account details:</p>
          <ul>
            <li><strong>Vendor ID:</strong> ${vendorId}</li>
            <li><strong>Password:</strong> ${password}</li>
          </ul>
          <p>Please keep these details safe and do not share them with anyone.</p>
          <p>We hope you have a great experience with us. If you have any questions or need any assistance, feel free to reach out.</p>
          <p>Best regards,</p>
          <p><strong>The KIDTRYZ Team</strong></p>
        </div>
      `
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports={
    sendWelcomeEmail,
    sendWelcomeEmailToVendor
}