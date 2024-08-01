const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

//creating the otp
const createOtp = () => {
    return crypto.randomBytes(3).toString('hex');
}; 

//encrypti

//verifying password
const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

//sending email
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };
    await transporter.sendMail(mailOptions);
}

module.exports = {createOtp, hashPassword, verifyPassword, sendEmail  }