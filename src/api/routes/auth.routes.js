const express = require("express");
const audit = require("../../utils/audit");

const router = express.Router();
const {
    signUp,
    login,
    forgetPassword,
    resetPassword,
} = require("../../services/auth.service");
const {
    validateSignup,
    validateLogin,
    valiadteforgetPassword,
    validateResetPassword,
} = require("../../utils/validations");

router.post("/signup", validateSignup, signUp);
router.post("/login", validateLogin, login);
router.post("/forgetPassword", valiadteforgetPassword, forgetPassword);
router.post('/resetPassword/:resetToken',validateResetPassword,resetPassword)

module.exports.userRouter = router;
