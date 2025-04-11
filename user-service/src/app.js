const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const routers = require('../src/routers/user.router');
const helmet = require('helmet');
dotenv.config({ path: './config/dev.env' });
require('./db/mongoose');
const app = express(); 
app.use(cors({
  origin: '*'
}))
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./Swagger/swagger')(app);
app.use(helmet());
app.use(cors())
app.use('/user', routers);
app.get('/', (req, res) => {
  res.send('Welcome to the user panel');
});
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
