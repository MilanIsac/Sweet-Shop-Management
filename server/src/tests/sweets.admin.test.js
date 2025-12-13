require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const User = require("../models/models.user");
const Sweet = require("../models/models.sweet");

let adminToken;

describe("Admin Sweet Management", () => {

  beforeAll(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    await User.create({
      name: "Admin User",
      email: "admin@sweets.com",
      password: "password123",
      role: "admin"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@sweets.com",
        password: "password123"
      });

    adminToken = res.body.token;

    expect(res.statusCode).toBe(200);
    expect(adminToken).toBeDefined();
  });

  it("admin should be able to add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Rasgulla",
        price: 300,
        stock: 40
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Rasgulla");
    expect(res.body.price).toBe(300);
    expect(res.body.stock).toBe(40);
  });
});
