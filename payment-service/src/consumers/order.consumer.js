const paymentService = require("../services/payment.service");

const MAX_RETRIES = 3;

async function consumeOrderCreated(channel) {

  // 🔹 1. Exchange
  await channel.assertExchange("order.exchange", "direct", {
    durable: true
  });

  // 🔹 2. Main Queue (Payment Service specific)
  await channel.assertQueue("order.created.payment", {
    durable: true,
    deadLetterExchange: "",
    deadLetterRoutingKey: "order.retry"
  });

  // 🔹 3. Bind queue to exchange
  await channel.bindQueue(
    "order.created.payment",
    "order.exchange",
    "order.created"
  );

  // 🔹 4. Retry Queue (with delay)
  await channel.assertQueue("order.retry", {
    durable: true,
    arguments: {
      "x-message-ttl": 5000,
      "x-dead-letter-exchange": "",
      "x-dead-letter-routing-key": "order.created.payment"
    }
  });

  // 🔹 5. DLQ
  await channel.assertQueue("order.dlq", {
    durable: true
  });

  console.log("Payment Service listening via exchange");

  channel.consume("order.created.payment", async (msg) => {

    try {

      const order = JSON.parse(msg.content.toString());
      const retries = order.retries || 0;

      console.log(`Attempt ${retries + 1} for order ${order.orderId}`);

      const result = await paymentService.processPayment(order);

      // ✅ success
      await channel.assertQueue("payment.success");

      channel.sendToQueue(
        "payment.success",
        Buffer.from(JSON.stringify(result))
      );

      console.log("Payment Success Event Published");

      channel.ack(msg);

    } catch (error) {

      const order = JSON.parse(msg.content.toString());
      const retries = order.retries || 0;

      console.log(`Payment failed for order ${order.orderId}`);

      if (retries < MAX_RETRIES) {

        console.log("Sending to retry queue...");

        const updatedOrder = {
          ...order,
          retries: retries + 1
        };

        channel.sendToQueue(
          "order.retry",
          Buffer.from(JSON.stringify(updatedOrder))
        );

      } else {

        console.log("Sending to DLQ (permanent failure)");

        channel.sendToQueue(
          "order.dlq",
          Buffer.from(JSON.stringify(order))
        );
      }

      channel.ack(msg);
    }

  });

}

module.exports = { consumeOrderCreated };