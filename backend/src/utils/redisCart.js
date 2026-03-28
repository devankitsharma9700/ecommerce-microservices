const redisClient = require("../config/redis");

const TTL = 1800;

const getCart = async (userId) => {
  const data = await redisClient.get(`cart:${userId}`);
  return data ? JSON.parse(data) : null;
};

const setCart = async (userId, cart) => {
  await redisClient.set(
    `cart:${userId}`,
    JSON.stringify(cart),
    "EX",
    TTL
  );
};

const clearCart = async (userId) => {
  await redisClient.del(`cart:${userId}`);
};

module.exports = { getCart, setCart, clearCart };
