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
            userName: "osama1111",
            email: "osama@elshaer.com",
            password: "Password@123",
            passwordConfirmation: "Password@123",
        };

        const response = await request(app)
            .post("/api/users/signup")
            .send(newUser);
        expect(response.status).toBe(201);
        expect(ObjectId.isValid(response.body.data.userId)).toBeTruthy();
    }, 10000);

    it("should Login and return token", async () => {
        const userData = {
            userName: "osama1111",
            password: "Password@123",
        };
        const response = await request(app)
            .post("/api/users/login")
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.data.token).toBeTruthy();
    });

    it("should assign token to user to give ability to change password", async () => {
        const email = "osama@elshaer.com";
        const response = await request(app)
            .post("/api/users/forgetPassword")
            .send({ email });
        expect(response.body.data.sendMail).toBeTruthy();
    }, 10000);

    afterAll(async () => {
        await getDb().dropDatabase();
    });
});
