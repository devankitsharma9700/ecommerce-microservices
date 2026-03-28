const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("./config/swagger");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use("/orders", orderRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;


