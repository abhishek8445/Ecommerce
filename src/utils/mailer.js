const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async function sendEmail(to, message) { 
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to,
  subject: "Product Back in Stock!",
  text: `Dear Customer,

Good news! The ${message} 
Visit our website to place your order before it sells out again.
Thank you for choosing us!

Best regards,  
E-commerce site`
});

};