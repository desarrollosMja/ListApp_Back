const { createTransport } = require("nodemailer")
const { email } = require("../../config")

const nodemailerTransporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: email.EMAIL_ADDRESS,
        pass: email.EMAIL_PASSWORD
    }
})

module.exports = { nodemailerTransporter }