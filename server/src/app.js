const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/routes.auth.js");
const dotenv = require('dotenv').config();
const authController = require('./controllers/controllers.auth.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Sweet Shop API running");
});

module.exports = app;
