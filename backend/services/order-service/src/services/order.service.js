require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const orderController = require("./controllers/order.controller");

async function start() {

  await connectDB();

  const channel = await connectRabbitMQ();

  orderController.setChannel(channel);

  const PORT = process.env.PORT || 3003;

  app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
  });

}

start();