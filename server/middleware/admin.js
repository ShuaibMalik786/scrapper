const responseFormatter = require("../helpers/response");

module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden

  if (!req.user.isAdmin) {
    let response = responseFormatter("failed", null, "Access denied.");
    return res.status(403).send(response);
  }
  next();
};