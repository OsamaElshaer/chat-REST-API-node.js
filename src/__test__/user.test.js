var { ObjectId } = require("mongodb");
const request = require("supertest");
const { app } = require("../loaders/app");
const { mongoConnect, getDb } = require("../loaders/database");

describe("user operations", () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    it("should create a new user", async () => {
        const newUser = {
            userName: "OsamaElshaer123",
            email: "OsamaElshaer123@email.com",
            password: "password123",
            passwordConfirmation: "password123",
        };

        const response = await request(app)
            .post("/api/users/signup")
            .send(newUser);

        expect(response.status).toBe(201);
        expect(ObjectId.isValid(response.body.data.userId)).toBeTruthy();
    });

    it("should Login and return token", async () => {
        const userData = {
            userName: "OsamaElshaer123",
            password: "password123",
        };
        const response = await request(app)
            .post("/api/users/login")
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.data.token).toBeTruthy();
    });

    afterAll(async () => {
        await getDb().dropCollection("users");
    });
});
