require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/models.sweets");

describe("Sweets API", () => {

  beforeAll(async () => {
    await Sweet.deleteMany({});

    await Sweet.create([
      { name: "Kaju Katli", price: 500, stock: 20 },
      { name: "Gulab Jamun", price: 200, stock: 50 }
    ]);
  });

  it("should return list of all sweets", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.sweets.length).toBe(2);
    expect(res.body.sweets[0].name).toBeDefined();
  });
});
