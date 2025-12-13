const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world from server');
});

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
