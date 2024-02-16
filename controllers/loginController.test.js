const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST } = process.env;

beforeAll(async () => {
  await mongoose.connect(DB_HOST);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Login Controller", () => {
  it("should login user", async () => {
    const userData = {
      email: "user1234@gmail.com",
      password: "123457",
    };

    const response = await request(app).post("/auth/login").send(userData);

    expect(response.status).toBe(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();

    expect(response.body.user.email).toBe(userData.email);
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
