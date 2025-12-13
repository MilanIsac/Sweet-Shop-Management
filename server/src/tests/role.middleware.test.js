require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const User = require("../models/models.user");

let userToken;
let adminToken;

describe("Role-based authorization", () => {

  beforeAll(async () => {
    await User.deleteMany({});

    await User.create({
      name: "Normal User",
      email: "user@test.com",
      password: "password123",
      role: "user"
    });

    await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: "password123",
      role: "admin"
    });

    const userRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@test.com",
        password: "password123"
      });

    const adminRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "password123"
      });

    userToken = userRes.body.token;
    adminToken = adminRes.body.token;

    expect(userRes.statusCode).toBe(200);
    expect(adminRes.statusCode).toBe(200);
    expect(userToken).toBeDefined();
    expect(adminToken).toBeDefined();
  });

  it("should block normal user from admin route", async () => {
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${userToken}`);

    expect([401, 403]).toContain(res.statusCode);
  });

  it("should allow admin user to access admin route", async () => {
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Admin access granted");
  });
});
