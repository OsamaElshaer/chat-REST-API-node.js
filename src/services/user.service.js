const { sendMail } = require("../utils/sendMail");
const { createUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

exports.signUp = async (userName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await createUser(userName, email, hashedPassword);
    const subject = "Welcome to Our Application!";
    const text =
        "Thank you for signing up. We are excited to have you on board!";

    const sendMailRes = await sendMail(email, subject, text);
    const result = {
        userId,
        sendMailRes,
    };
    return result;
};

exports.login = async (user) => {
    const payload = { userId: user._id, username: user.userName };

    const token = jwt.sign(payload, env.secretKey, { expiresIn: "5h" });
    return token;
};
