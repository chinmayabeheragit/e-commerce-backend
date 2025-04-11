const jwt = require('jsonwebtoken');
const generateAuthToken =  (username, password,role) => {
  try {
    return jwt.sign({ username, password, role}, process.env.SECRET_KEY);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  generateAuthToken
}