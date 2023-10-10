const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const SecretKey = require("../config/crypto");

const app = express();
app.use(cookieParser());

const jwtSecret = SecretKey;

const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.locals.username = decoded.username;
    return next();
  } catch (err) {
    console.log(err);
    return res.redirect("/login");
  }
};

module.exports = checkAuth;
