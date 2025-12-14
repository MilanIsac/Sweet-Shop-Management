const mongoose = require("mongoose");
const { registerAndLogin } = require("./auth.helper");
const User = require("../../models/models.user");

describe("Auth Helper", () => {

  beforeAll(async () => {
    await User.deleteMany({});
  });

  it("should register and login a user and return a token", async () => {
    const token = await registerAndLogin({
      name: "Helper User",
      email: "helper@test.com",
      password: "password123",
      role: "user"
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

});
