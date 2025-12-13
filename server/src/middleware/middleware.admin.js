const authMiddleware = require("./middleware.auth");
const requireRole = require("./middleware.role");

module.exports = [
  authMiddleware,
  requireRole("admin")
];
