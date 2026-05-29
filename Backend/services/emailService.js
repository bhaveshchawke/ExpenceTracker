const nodmailer = require("nodemailer");
const transport = nodmailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (toMail, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toMail,
    subject: "KharchaPani - OTP Verification",
    html: `<h2>Your OTP for registration: <b>${otp}</b></h2>
           <p>Yeh 5 minute mein expire ho jayega.</p>`,
  };
  await transport.sendMail(mailOptions);
};
module.exports = sendOTPEmail;
