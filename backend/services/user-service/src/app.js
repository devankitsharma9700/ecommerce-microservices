const express = require("express");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./routes/user.routes");
const swaggerDocs = require("./config/swagger");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;