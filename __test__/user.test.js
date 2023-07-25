var { ObjectId } = require("mongodb");
const { httpServer } = require("../src/loaders/app");
const request = require("supertest")(httpServer);
const { mongoConnect, getDb } = require("../src/loaders/database");
const { UserModel } = require("../src/models/user.model");
const userModel = new UserModel();
let JwtToken = "";

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

        const response = await request.post("/api/users/signup").send(newUser);
        expect(response.status).toBe(201);
        expect(ObjectId.isValid(response.body.data.userId)).toBeTruthy();
    }, 10000);

    it("should Login and return token", async () => {
        const userData = {
            userName: "osama1111",
            password: "Password@123",
        };
        const response = await request.post("/api/users/login").send(userData);

        JwtToken = response.body.data.token;
        expect(response.status).toBe(201);
        expect(response.body.data.token).toBeTruthy();
    });

    it(" should send token to user email to confirmation and reset password", async () => {
        //forget password
        const email = "osamaelshaer944@gmail.com";
        const forgetPasswordResponse = await request
            .post("/api/users/forgetPassword")
            .send({ email });
        const user = await userModel.find("email", email);

        expect(forgetPasswordResponse.body.data.sendMail).toBeTruthy();

        //reset password
        const password = "Password2@Again1";
        const passwordConfirmation = "Password2@Again1";
        const resetPasswordResponse = await request
            .post(`/api/users/resetPassword/${user.token.resetToken}`)
            .send({ password, passwordConfirmation });
        expect(resetPasswordResponse.body.data.status).toBeTruthy();
    }, 30000);

    it("should create new room ", async () => {
        const response = await request
            .post("/api/rooms/create")
            .set("Authorization", `Bearer ${JwtToken}`)
            .send({ roomName: "room1" });
        expect(response.status).toBe(201);
    });

    it("it should open bidirection comunication with using socket Io", async () => {
        const response = await request
            .post("/api/rooms/join/room1")
            .set("Authorization", `Bearer ${JwtToken}`);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await getDb().dropDatabase();
    });
});
