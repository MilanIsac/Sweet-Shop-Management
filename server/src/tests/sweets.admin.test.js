require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const User = require("../models/models.user");
const Sweet = require("../models/models.sweets");
const mongoose = require('mongoose');

let adminToken;
let userToken;

describe("Admin Sweet Management", () => {

    beforeAll(async () => {
        await User.deleteMany({});
        await Sweet.deleteMany({});

        // create normal user
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Normal User",
                email: "user@test.com",
                password: "password123"
            });

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
                name: "Admin User",
                email: "admin@test.com",
                password: "password123",
                role: "admin"
            });

        const adminLogin = await request(app)
            .post("/api/auth/login")
            .send({
                email: "admin@test.com",
                password: "password123"
            });

        adminToken = adminLogin.body.token;
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


    it("non-admin should NOT be able to add a sweet", async () => {
        const res = await request(app)
            .post("/api/sweets")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Kaju Katli",
                price: 500,
                stock: 20
            });

        expect([401, 403]).toContain(res.statusCode);
    });


    it("admin should be able to update a sweet", async () => {
        const sweet = await Sweet.create({
            name: "Ladoo",
            price: 200,
            stock: 30
        });

        const res = await request(app)
            .put(`/api/sweets/${sweet._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ price: 250 });

        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(250);
    });


    it("admin should be able to delete a sweet", async () => {
        const sweet = await Sweet.create({
            name: "Barfi",
            price: 300,
            stock: 15
        });

        const res = await request(app)
            .delete(`/api/sweets/${sweet._id}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Sweet deleted");
    });

    it("should fail if sweet name is missing", async () => {
        const res = await request(app)
            .post("/api/sweets")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                price: 100,
                stock: 10,
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
    });

});
