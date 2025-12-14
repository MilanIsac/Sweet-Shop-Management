const request = require("supertest");
const app = require("../../app");

async function registerAndLogin(user) {
  await request(app)
    .post("/api/auth/register")
    .send(user);

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: user.email,
      password: user.password
    });

  return res.body.token;
}

module.exports = { registerAndLogin };
