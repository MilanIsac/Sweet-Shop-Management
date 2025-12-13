const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/routes.auth.js");
const dotenv = require('dotenv');
require('dotenv').config();
const protectedRoutes = require("./routes/protected_routes.js");



const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Sweet Shop API running");
});

module.exports = app;
