const { body } = require("express-validator");
const { getDb } = require("../loaders/database");
const bcrypt = require("bcrypt");
const { findByUserName } = require("../models/user.model");

exports.validateSignup = [
    body("userName")
        .matches("^[0-9a-zA-Z ]+$", "i")
        .withMessage("Invalid username")
        .custom(async (value) => {
            const user = await findByUserName(value);
            if (user) {
                throw new Error("User already exists");
            }
            return true;
        }),
    body("email", "Please enter a valid email address")
        .isEmail()
        .normalizeEmail(),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one digit")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain at least one special character")
        .custom((value, { req }) => {
            if (value !== req.body.passwordConfirmation) {
                throw new Error("Password confirmation is incorrect");
            }
            return true;
        }),
];
exports.validateLogin = [
    body("userName")
        .matches("^[0-9a-zA-Z ]+$", "i")
        .withMessage("Invalid username")
        .custom(async (value, { req }) => {
            const user = await findByUserName(value);
            if (!user) {
                throw new Error("User does not exist");
            }
            req.user = user;
            return true;
        }),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Invalid password")
        .custom(async (value, { req }) => {
            const user = req.user;
            const result = await bcrypt.compare(value, user.password);
            if (!result) {
                throw new Error("Incorrect password");
            }
            return true;
        }),
];
exports.valiadteforgetPassword = [
    body("email", "Please enter a valid email address")
        .isEmail()
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const db = await getDb();
            const user = await db.collection("users").findOne({ email: value });
            if (!user) {
                throw new Error("There is no user with this email");
            }
            req.user = user;
            return true;
        }),
];
