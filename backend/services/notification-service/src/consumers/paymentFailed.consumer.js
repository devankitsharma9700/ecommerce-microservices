const notificationService = require("../services/notification.service");

async function consumePaymentFailed(channel) {

  await channel.assertQueue("payment.failed");

  console.log("Listening for payment.failed events");

  channel.consume("payment.failed", async (msg) => {

    const data = JSON.parse(msg.content.toString());

    console.log("Payment Failed Event Received");

    await notificationService.sendPaymentFailedNotification(data);

    channel.ack(msg);

  });

}

module.exports = { consumePaymentFailed };