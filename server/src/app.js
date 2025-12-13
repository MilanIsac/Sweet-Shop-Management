const express = require("express");

const authRoutes = require("./routes/routes.auth");
const adminRoutes = require("./routes/routes.admin");
const sweetRoutes = require("./routes/routes.sweets.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Sweet Shop API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sweets", sweetRoutes);

module.exports = app;
