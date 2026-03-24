const notificationService = require("../services/notification.service");

async function consumeUserCreatedEvent(channel) {

  await channel.assertQueue("message.generate");

  console.log("Listening for user.created events");

  channel.consume("message.generate", async (msg) => {
    const user = JSON.parse(msg.content.toString());
    console.log("User Created Event Received");

    try {
  await notificationService.sendWelcomeNotification(user);
  channel.ack(msg);
} catch (error) {
  console.error("Error processing message:", error);
  // optional: don't ack → message stays in queue
}

  });

}

module.exports = {
  consumeUserCreatedEvent
};