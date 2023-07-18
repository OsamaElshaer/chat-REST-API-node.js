var { ObjectId } = require("mongodb");
const request = require("supertest");
const { app } = require("../loaders/app");
const { mongoConnect, getDb } = require("../loaders/database");
const { UserModel } = require("../models/user.model");
const userModel = new UserModel()
describe("user operations", () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    it("should create a new user", async () => {
        const newUser = {
            userName: "osama1111",
            email: "osamaelshaer944@gmail.com",
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

    it(" should send token to user email to confirmation and reset password", async () => {
        //forget password
        const email = "osamaelshaer944@gmail.com";
        const forgetPasswordResponse = await request(app)
            .post("/api/users/forgetPassword")
            .send({ email });
        const user = await userModel.find("email", email);
        expect(forgetPasswordResponse.body.data.sendMail).toBeTruthy();

        //reset password
        const password = "Password2@Again1";
        const passwordConfirmation = "Password2@Again1";
        const resetPasswordResponse = await request(app)
            .post(`/api/users/resetPassword/${user.token.resetToken}`)
            .send({ password, passwordConfirmation });
        expect(resetPasswordResponse.body.data.status).toBeTruthy();
    }, 30000);

    afterAll(async () => {
        await getDb().dropDatabase();
    });
});
