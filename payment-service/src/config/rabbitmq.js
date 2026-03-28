const amqp = require("amqplib");

async function connectRabbitMQ() {
  while (true) {
    try {
      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      const channel = await connection.createChannel();

      console.log("Payment Service RabbitMQ Connected");

      return channel;
    } catch (error) {
      console.log("RabbitMQ retrying...");
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

module.exports = { connectRabbitMQ };