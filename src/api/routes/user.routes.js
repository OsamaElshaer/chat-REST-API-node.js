const express = require("express");
const audit = require("../../utils/audit");

const router = express.Router();
const { signUp, login } = require("../../services/user.service");
const { validationResult, body } = require("express-validator");
const { validateSignup, validateLogin } = require("../../utils/validations");
const CustomError = require("../../utils/customError");

router.post("/signup", validateSignup, async (req, res, next) => {
    const { userName, email, password } = req.body;
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            throw new CustomError("signup", 422, errors.array()[0].msg);
        }
        const result = await signUp(userName, email, password);
        res.status(201).json({
            msg: "User signed up successfully",
            data: result,
        });
        audit(
            "User",
            "Signup",
            userName,
            new Date(),
            req.method,
            res.statusCode
        );
    } catch (error) {
        next(error);
    }
});

router.post("/login", validateLogin, async (req, res, next) => {
    const userName = req.user.userName;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError("login", 422, errors.array()[0].msg);
        }
        const user = req.user;
        const result = await login(user);
        res.status(201).json({
            msg: "user logged in ",
            data: { token: result },
        });
        audit(
            "User",
            "Login",
            userName,
            new Date(),
            req.method,
            res.statusCode
        );
    } catch (error) {
        next(error);
    }
});

module.exports.userRouter = router;
