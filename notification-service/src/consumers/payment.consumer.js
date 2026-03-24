const notificationService = require("../services/notification.service");

async function consumePaymentSuccess(channel) {

  await channel.assertQueue("payment.success");

  console.log("Listening for payment.success events");

  channel.consume("payment.success", async (msg) => {

    const data = JSON.parse(msg.content.toString());

    console.log("Payment Success Event Received");

    await notificationService.sendPaymentNotification(data);

    channel.ack(msg);

  });

}

module.exports = { consumePaymentSuccess };