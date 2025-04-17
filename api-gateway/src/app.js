const express = require('express');
const app = express();
const logger = require('./middlewares/logger.middleware');

// Middlewares
app.use(logger);

// Load all routes
require('./routes/admin.route')(app);
require('./routes/super.admin.route')(app);
require('./routes/user.route')(app);
require('./routes/vendor.route')(app);
require('./routes/payment.route')(app);

// Default route
app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

module.exports = app;
