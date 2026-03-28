

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendWelcomeNotification(user) {
  try {
    console.log("Sending email to:", user.email);

    const info = await transporter.sendMail({
      from: `"Notification Service" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome 🎉",
      text: `Hello ${user.name}, your account has been created successfully!`,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}
async function sendOrderNotification(data){
 console.log(`Order confirmed for user ${data.userId}`);
}
async function sendPaymentNotification(data){
console.log(`Payment successful for order ${data.orderId}`);
}

async function sendPaymentFailedNotification(data){
console.log(`Payment FAILED for order ${data.orderId}`);}
module.exports = {
  sendWelcomeNotification,
  sendOrderNotification,
  sendPaymentNotification,
  sendPaymentFailedNotification
};