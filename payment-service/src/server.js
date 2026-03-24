require("dotenv").config();

const app = require("./app");
const { connectRabbitMQ } = require("./config/rabbitmq");
const { consumeOrderCreated } = require("./consumers/order.consumer");

async function start() {

  const channel = await connectRabbitMQ();

  await consumeOrderCreated(channel);

  const PORT = process.env.PORT || 3004;

  app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
  });

}

start();