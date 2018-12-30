const jwt = require("jsonwebtoken");
const config = require("config");
const responseFormatter = require("../helpers/response");

module.exports = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    let response = responseFormatter(
      "failed",
      null,
      "Access denied. No token provided."
    );
    return res.status(401).send(response);
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
