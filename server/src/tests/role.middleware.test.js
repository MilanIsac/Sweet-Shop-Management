require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const User = require("../models/models.user");

let userToken;
let adminToken;

describe("Role-based authorization", () => {

  beforeAll(async () => {
    await User.deleteMany({});

    // create normal user
    const userRes = await request(app)
      .post("/api/auth/register")
      .send({
        name: "User",
        email: "user@test.com",
        password: "password123",
        role: "user"
      });

    // login normal user
    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@test.com",
        password: "password123"
      });

    userToken = userLogin.body.token;

    // create admin user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "password123",
        role: "admin"
      });

    // login admin user
    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "password123"
      });

    adminToken = adminLogin.body.token;

    expect(userToken).toBeDefined();
    expect(adminToken).toBeDefined();
  });

  it("should block normal user from admin route", async () => {
    const userRes = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${userToken}`);

    // ✅ user must NOT access admin route
    expect([401, 403]).toContain(userRes.statusCode);
  });

  it("should allow admin user to access admin route", async () => {
    const adminRes = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${adminToken}`);

    // ✅ admin MUST access admin route
    expect(adminRes.statusCode).toBe(200);
    expect(adminRes.body.message).toBe("Admin access granted");
  });

});
