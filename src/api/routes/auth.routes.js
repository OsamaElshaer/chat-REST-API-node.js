const express = require("express");
const audit = require("../../utils/audit");

const router = express.Router();
const {
    signUp,
    login,
    forgetPassword,
} = require("../../services/auth.service");
const {
    validateSignup,
    validateLogin,
    valiadteforgetPassword,
} = require("../../utils/validations");

router.post("/signup", validateSignup, signUp);
router.post("/login", validateLogin, login);
router.post("/forgetPassword", valiadteforgetPassword, forgetPassword);

module.exports.userRouter = router;
