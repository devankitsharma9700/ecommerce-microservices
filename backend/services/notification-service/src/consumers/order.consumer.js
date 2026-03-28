const notificationService = require("../services/notification.service");

async function consumeOrderCreated(channel) {

  // 🔹 1. Exchange
  await channel.assertExchange("order.exchange", "direct", {
    durable: true
  });

  // 🔹 2. Notification-specific queue
  await channel.assertQueue("order.created.notification", {
    durable: true
  });

  // 🔹 3. Bind queue to exchange
  await channel.bindQueue(
    "order.created.notification",
    "order.exchange",
    "order.created"
  );

  console.log("Notification Service listening via exchange");

  // 🔹 4. Consume from this queue
  channel.consume("order.created.notification", async (msg) => {

    const data = JSON.parse(msg.content.toString());

    console.log("Order Created Event Received (Notification)");

    await notificationService.sendOrderNotification(data);

    channel.ack(msg);

  });

}

module.exports = { consumeOrderCreated };