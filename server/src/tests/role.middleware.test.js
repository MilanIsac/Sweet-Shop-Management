require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/models.user");

let userToken;
let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.create({
    name: "Normal User",
    email: "user@test.com",
    password: "password123",
    role: "user"
  });

  let res = await request(app).post("/api/auth/login").send({
    email: "user@test.com",
    password: "password123"
  });
  userToken = res.body.token;

  await User.create({
    name: "Admin User",
    email: "admin@test.com",
    password: "password123",
    role: "admin"
  });

  res = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "password123"
  });
  adminToken = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Role-based authorization", () => {

  it("should block normal user from admin route", async () => {
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("should allow admin user to access admin route", async () => {
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Admin access granted");
  });

});
