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
            userName: "osama31005",
            email: "osama@email.com",
            password: "12345678",
            passwordConfirmation: "12345678",
        };

        const response = await request(app)
            .post("/api/users/signup")
            .send(newUser);

        expect(response.status).toBe(201);
        expect(ObjectId.isValid(response.body.data.userId)).toBeTruthy();
    });

    afterAll(async () => {
        await getDb().dropCollection("users");
    });
});
