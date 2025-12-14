const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader =
    req.headers.authorization ||
    req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }


  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
