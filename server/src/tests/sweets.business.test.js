const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/models.user");

let adminToken;

beforeAll(async () => {
  await User.deleteMany({});

  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "biz@admin.com",
      password: "password123",
      role: "admin"
    });

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "biz@admin.com",
      password: "password123"
    });

  adminToken = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweet Business Rules", () => {

  it("should not allow negative price", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Bad Sweet",
        price: -10,
        stock: 5
      });

    expect(res.statusCode).toBe(400);
  });

});
