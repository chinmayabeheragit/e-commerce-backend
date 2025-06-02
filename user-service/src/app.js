const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const pino = require('pino');
const pinoHttp = require('pino-http');
const routers = require('./routers/user.router');  // fixed relative path

dotenv.config({ path: './config/dev.env' });
require('./db/mongoose');  // correct relative path

const app = express();

// Initialize pino logger
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty', // human-readable logs for dev
    options: { colorize: true }
  }
});

// Use pino-http middleware for logging requests
app.use(pinoHttp({ logger }));

// Middleware stack
app.use(cors({ origin: '*' }));  // single cors call, clean
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger integration
require('./Swagger/swagger')(app);

// Route bindings
app.use('/user', routers);

// Root route
app.get('/', (req, res) => {
  req.log.info('Root endpoint hit');
  res.send('Welcome to the user panel');
});

// Start server with logger
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
});
