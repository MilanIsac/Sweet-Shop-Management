require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const User = require("../models/models.user");
const { registerAndLogin } = require("./helpers/auth.helper");

let userToken;
let adminToken;

describe("Role-based authorization", () => {

  beforeAll(async () => {
    await User.deleteMany({});

    userToken = await registerAndLogin({
      name: "User",
      email: "user@test.com",
      password: "password123",
      role: "user"
    });

    adminToken = await registerAndLogin({
      name: "Admin",
      email: "admin@test.com",
      password: "password123",
      role: "admin"
    });

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
