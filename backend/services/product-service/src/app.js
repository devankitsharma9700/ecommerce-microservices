const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("./config/swagger");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;