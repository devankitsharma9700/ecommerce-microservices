
const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertQueue("user.created");

    console.log("RabbitMQ Connected");
  } catch (error) {
    console.log("RabbitMQ not ready, retrying in 5 seconds...");
    setTimeout(connectRabbitMQ, 5000);
  }
}

function getChannel() {
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel
};