const nodemailer = require("nodemailer");
const { email } = require("../config/env");
const { logger } = require("./logger");
const CustomError = require("./customError");

exports.sendMail = async (emailTo, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "your-email@gmail.com",
                pass: "your-password",
            },
        });

        const mailOptions = {
            from: email,
            to: emailTo,
            subject: subject,
            text: text,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        logger.warn("Error sending email:", { error: error.message });
        return false;
    }
};
