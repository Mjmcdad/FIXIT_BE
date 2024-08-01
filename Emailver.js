const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

//transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

//send email

const sendVerEmail = async (to, verficationToken) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Email Verification",
    html: ` 
        <html>
      <body>
        <p>Welcome to FIXIT</p>
        <p>Please click the following link to verify your email:</p>
        <a href="http://localhost:4000/api/auth/verify/${verificationToken}">Verify Email</a>
      </body>
    </html>
        `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification Email Sent');
  } catch (err) {
    console.error('Error Sending Verification email:', err);
  }
};

module.exports = {sendVerEmail};
