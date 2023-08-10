"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = require("../../../config");
const nodemailer = require("nodemailer");
async function sendEmail(emailProps) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        disableFileAccess: true,
        auth: {
            user: (0, config_1.default)().mail.user,
            pass: (0, config_1.default)().mail.pass,
        },
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error.message);
        }
        else {
            console.log('Email connected');
        }
    });
    const { email, html, text } = emailProps;
    await transporter.sendMail({
        from: 'charlsembehart@gmail.com',
        to: email,
        subject: 'Document Invitation',
        html: html,
        text: text,
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map