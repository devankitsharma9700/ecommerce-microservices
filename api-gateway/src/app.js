const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 🔹 User Service
app.use("/api/users", createProxyMiddleware({
  target: "http://user-service:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/api/users": "/users"
  }
}));

// 🔹 Product Service
app.use("/api/products", createProxyMiddleware({
  target: "http://product-service:3002",
  changeOrigin: true,
  pathRewrite: {
    "^/api/products": "/products"
  }
}));

// 🔹 Order Service
app.use("/api/orders", createProxyMiddleware({
  target: "http://order-service:3003",
  changeOrigin: true,
  pathRewrite: {
    "^/api/orders": "/orders"
  }
}));

module.exports = app;