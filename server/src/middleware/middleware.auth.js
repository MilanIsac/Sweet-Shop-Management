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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
