require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const User = require('../models/models.user');
const mongoose = require('mongoose');

beforeAll(async () => {
  await User.deleteMany({});
});


describe('Server checking', () => {
  it('should respond with 200 status code', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Sweet Shop API running');
  })
})

describe("Authentication APIs", () => {

  it("should register a new user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBeDefined();

    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
  });

  it("should not allow duplicate email registration", async () => {
    await User.create({
      name: "User One",
      email: "duplicate@example.com",
      password: "password123"
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "User Two",
        email: "duplicate@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });


  it("should fail registration if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "missing@example.com"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it("should login user and return JWT token", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Login User",
        email: "login@example.com",
        password: "password123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should block access without token", async () => {
    const res = await request(app).get("/api/admin");
    expect(res.statusCode).toBe(401);
  });

  it("should reject login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(400);
  });

});


afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

