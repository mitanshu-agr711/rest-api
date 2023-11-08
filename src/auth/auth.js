const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/auth.js");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignIpRequest,
} = require("./validator");


router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);


router.route("/register").post(validateSignUpRequest, isRequestValidated, signUp);


module.exports = router;