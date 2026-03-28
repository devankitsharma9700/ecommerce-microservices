async function consumeDLQ(channel) {

  await channel.assertQueue("order.dlq");

  console.log("Listening to DLQ...");

  channel.consume("order.dlq", async (msg) => {

    const data = JSON.parse(msg.content.toString());

    console.log("❌ FINAL FAILURE (DLQ):", data);

    channel.ack(msg);

  });

}

module.exports = { consumeDLQ };