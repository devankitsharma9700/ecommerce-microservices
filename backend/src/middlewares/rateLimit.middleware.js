const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default;
const redis = require("../config/redis");

const redisLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests, slow down",
  },
});

module.exports = redisLimiter;
