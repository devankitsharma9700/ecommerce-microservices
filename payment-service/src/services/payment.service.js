exports.processPayment = async (order) => {

  console.log(`Processing payment for order ${order.orderId}`);

  // simulate random failure
  const isSuccess = Math.random() > 0.5;

  await new Promise(res => setTimeout(res, 1000));

  //   // ❌ FORCE FAILURE
  // throw new Error("Payment failed intentionally");

  if (!isSuccess) {
    throw new Error("Payment failed");
  }

  console.log("Payment successful");

  return {
    orderId: order.orderId,
    status: "success"
  };
};