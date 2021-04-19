const express = require("express");
const router = express.Router();
const pool = require("../database");

const { isAuth, isNotAuth } = require('../lib/authentication');


//Login
router.get("/login" , (req, res) => {
  res.render('auth/login' , {signup: 1});
});

//SignUp
router.get('/signup' , (req, res) => {
  res.render('auth/signup' , {login: 1});
});

module.exports = router;