const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

dotenv.config();
const app = express();

const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/user.route");
const vendorRoute = require("./routes/vendor.route");
const paymentRoute = require("./routes/payment.route");
const notifyRoute = require("./routes/notification.route");

// Routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/vendor", vendorRoute);
app.use("/payment", paymentRoute);
app.use("/notify", notifyRoute);

// Swagger Docs
const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.redirect("/docs"));

app.listen(process.env.PORT || 3000, () =>
  console.log(`API Gateway running on port ${process.env.PORT || 3000}`)
);
