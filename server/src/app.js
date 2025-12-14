const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/routes.auth");
const sweetRoutes = require("./routes/routes.sweets");
const adminRoutes = require("./routes/routes.admin");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
