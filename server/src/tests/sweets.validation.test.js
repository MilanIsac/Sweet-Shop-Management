require("dotenv").config();
const request = require("supertest");
const app = require("../app");

describe("Sweet Validation", () => {
    it("should fail when required fields are missing", async () => {
        const res = await request(app)
            .post("/api/sweets")
            .send({ name: "Ladoo" }); // missing price & stock

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    });

    it("should return 404 for invalid sweet ID", async () => {
        const res = await request(app)
            .put("/api/sweets/invalid-id")
            .send({ price: 500 });

        expect(res.statusCode).toBe(404);
    });

});
