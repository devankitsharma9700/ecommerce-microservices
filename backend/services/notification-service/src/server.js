require("dotenv").config();

const app = require("./app");
const { connectRabbitMQ } = require("./config/rabbitmq");
const { consumeUserCreatedEvent } = require("./consumers/user.consumer");
const { consumeOrderCreated } = require("./consumers/order.consumer");
const { consumePaymentSuccess } = require("./consumers/payment.consumer");
const { consumePaymentFailed } = require("./consumers/paymentFailed.consumer");
const { consumeDLQ } = require("./consumers/dlq.consumer");

async function startServer() {

  const channel = await connectRabbitMQ();

  await consumeUserCreatedEvent(channel);
  await consumeOrderCreated(channel);
  await consumePaymentSuccess(channel);
  await consumePaymentFailed(channel);
  await consumeDLQ(channel);

  
  const PORT = process.env.PORT || 3006;

  app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
  });

}

startServer();