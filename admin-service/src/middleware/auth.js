const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).send("Please provide an Authorization header...");
    }
    const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
    if("admin" !== decoded.role){
      return res.status(401).send("This is only for Admin.")
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};
module.exports = auth;