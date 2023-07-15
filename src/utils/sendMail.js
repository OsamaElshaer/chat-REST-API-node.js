const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const { logger } = require("./logger");
const env = require("../config/env");

exports.sendMail = async (emailTo, subject, html) => {
    try {
        let transporter;
        if (process.env.NODE_ENV === "test") {
            transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: env.mailTrapUser,
                    pass: env.mailTrapPass,
                },
            });
        }
        

        const mailOptions = {
            from: env.email,
            to: emailTo,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        logger.warn("Error sending email:", { error: error.message });
        throw new Error(error);
    }
};
