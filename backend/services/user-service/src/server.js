require("dotenv").config();
const {connectDB} = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const app = require("./app");

async function start() {

  await connectDB();

  await connectRabbitMQ();

  app.listen(3001, () => {
    console.log("User Service running on 3001");
  });

}

start();