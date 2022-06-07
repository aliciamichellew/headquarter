const express = require("express");
const router = express.Router();
const signUpTemplate = require("../models/SignUpModels");

router.post("/signup", (request, response) => {
  console.log("API kepanggil");
  console.log(request.body);
  const signedUpUser = new signUpTemplate({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  });
  signedUpUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
