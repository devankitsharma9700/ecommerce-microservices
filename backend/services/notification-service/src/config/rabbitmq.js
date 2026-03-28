const amqp = require("amqplib");

async function connectRabbitMQ() {

  while (true) {

    try {

      const connection = await amqp.connect(process.env.RABBITMQ_URL);

      const channel = await connection.createChannel();

      console.log("RabbitMQ Connected");

      return channel;

    } catch (error) {

      console.log("RabbitMQ not ready, retrying in 5 seconds...");

      await new Promise(resolve => setTimeout(resolve, 5000));

    }

  }

}

module.exports = {
  connectRabbitMQ
};