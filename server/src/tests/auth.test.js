const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/models.user');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
})

afterEach(async () => {
    await User.deleteMany({});
})

afterAll(async () => {
    await mongoose.connection.close();
})