const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendMail = (data, callback) => {
  transporter.sendMail(data, (err, info, response) => {
    return callback(err, info, response);
  });
};
