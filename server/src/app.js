const express = require("express");
const cors = require('cors');

const authRoutes = require("./routes/routes.auth");
const adminRoutes = require("./routes/routes.admin");
const sweetRoutes = require("./routes/routes.sweets.js");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Sweet Shop API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sweets", sweetRoutes);

module.exports = app;
