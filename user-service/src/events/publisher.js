const { getChannel } = require("../config/rabbitmq");

async function publishUserCreated(user) {

  const channel = getChannel();

  const message = {
    id: user._id,
    email: user.email,
    name: user.name
  };
  console.log("your message like this",message)

  channel.sendToQueue(
    "message.generate",
    Buffer.from(JSON.stringify(message))
  );

  console.log("User Created Event Published");

}

module.exports = {
  publishUserCreated
};