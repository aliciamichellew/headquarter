const fs = require("fs");
const ejs = require("ejs");
const emailer = require("../middlewares/emailerMiddleware");
// const verifyRegistration = require("../views/verifyRegistration.ejs");
const emailTemplatesDir = __dirname + "/../views";

/* Sends registration email */
exports.verifyRegistration = async (response) => {
  console.log("masuk verify registration");
  console.log("response = ", response);
  const user = response;
  //   const user = await User.findOne({ token: });
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + "/verifyRegistration.ejs",
      "ascii"
    );

    const domain =
      process.env.NODE_ENV == "production"
        ? "https://headquarter-orbital.herokuapp.com"
        : "http://localhost:5000";
    var verificationUrl = domain + "/verify" + "/" + response.token;

    const data = {
      from: "headquarter <headquarter.orbital@gmail.com>",
      to: response.email,
      subject: "Registration Confirmation",
      html: ejs.render(file, { user, verificationUrl }),
    };

    emailer.sendMail(data, (err, info, response) => {
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};

exports.forgotPassword = async (user, token) => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + "/forgotPassword.ejs",
      "ascii"
    );

    const domain =
      process.env.NODE_ENV == "production"
        ? "https://headquarter-orbital.herokuapp.com"
        : "http://localhost:5000";
    var forgotPasswordUrl = domain + "/resetpassword" + "/" + token;

    const data = {
      from: "headquarter <headquarter.orbital@gmail.com>",
      to: user.email,
      subject: "Forgot Password Request",
      html: ejs.render(file, { user, forgotPasswordUrl }),
    };

    emailer.sendMail(data, (err, info, response) => {
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};
