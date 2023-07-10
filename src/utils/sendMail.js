const nodemailer = require("nodemailer");
const { email } = require("../config/env");
const { logger } = require("./logger");
const env = require("../config/env");

exports.sendMail = async (emailTo, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: env.nodemailerUser,
                pass: env.nodemailerPass,
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
