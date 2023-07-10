const { body } = require("express-validator");
const { getDb } = require("../loaders/database");

exports.validateSignup = [
    body("userName")
        .matches("^[0-9a-zA-Z ]+$", "i")
        .custom(async (value) => {
            const user = await getDb()
                .collection("users")
                .findOne({ userName: value });
            if (user) {
                throw new Error("User already exists");
            }
            return true;
        }),
    body("email", "Please enter a valid email address")
        .isEmail()
        .normalizeEmail(),

    body(
        "password",
        "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
    )
        .isLength({ min: 8 })
        .isAlphanumeric()
        .matches("^[0-9a-zA-Z ]+$", "i")
        .custom((value, { req }) => {
            if (!value) {
                throw new Error("Password confirmation is required");
            }
            if (value !== req.body.passwordConfirmation) {
                throw new Error("Password confirmation is incorrect");
            }
            return true;
        }),
];
