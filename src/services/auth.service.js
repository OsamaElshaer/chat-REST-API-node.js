const { sendMail } = require("../utils/sendMail");
const { createUser, updateUser } = require("../models/user.model");
const { validationResult } = require("express-validator");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { audit } = require("../utils/audit");
const crypto = require("crypto");
const {
    forgetPasswordTemplate,
    signUpTemplate,
} = require("../utils/mailMessages");

exports.signUp = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError("signup", 422, errors.array()[0].msg);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const userId = await createUser(userName, email, hashedPassword);
        //send mail
        const subject = "Welcome to Our Application!";
        const text = signUpTemplate(userName);

        const sendMailRes = await sendMail(email, subject, text);
        const result = {
            userId,
            sendMailRes,
        };
        audit(
            "User",
            "Signup",
            userName,
            new Date(),
            req.method,
            res.statusCode
        );
        return res.status(201).json({
            msg: "User signed up successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const { userName } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError("login", 422, errors.array()[0].msg);
        }
        const payload = { username: userName };

        const token = jwt.sign(payload, env.secretKey, { expiresIn: "5h" });
        audit(
            "User",
            "Login",
            userName,
            new Date(),
            req.method,
            res.statusCode
        );
        return res.status(201).json({
            msg: "user logged in ",
            data: { token: token },
        });
    } catch (error) {
        next(error);
    }
};
exports.forgetPassword = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError("forgetPassword", 422, errors.array()[0].msg);
        }
        const buffer = await new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    reject(
                        new CustomError("crypto randomToken", 422, err.message)
                    );
                }
                resolve(buffer);
            });
        });

        const token = buffer.toString("hex");
        const user = req.user;
        user.token = token;
        user.tokenExpire = Date.now() + 36e5;
        await updateUser(user._id, user);

        const subject = "Forget Password";
        const html = forgetPasswordTemplate(token);
        const sendMailRes = await sendMail(user.email, subject, html);

        return res.status(201).json({
            msg: "Check your email to reset your password",
            data: {
                sendMail: sendMailRes,
            },
        });
    } catch (error) {
        next(error);
    }
};
