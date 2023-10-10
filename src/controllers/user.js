const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const path = require("path");
const jwt = require("jsonwebtoken");
//const dotenv = require("dotenv");
const User = require("../model/userModel");
const db = require("../config/db");
const checkAuth = require("../middleware/checkauth");
// const Article = require("./model/articlePost");
// const Comment = require("./model/commentModel");

const router = express.Router();

app.use(bodyParser.json());

router.get("/:username", checkAuth, async (req, res) => {
  try {
    const usernamek = req.params.username;
    const decodedToken = jwt.decode(req.cookies.token); 
    if (!decodedToken) {
      return res.status(401).send("Unauthorized");
    }

    const username = decodedToken.username;

    if(username !== usernamek){
      return res.send("invalid username");
    }
    const user = await User.findOne({ username })
      .populate({
        path: "articles",
        populate: { path: "author", select: "username" },
      })
      .exec();

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.render("viewprofile", { user });
  } catch (err) {
    console.log(err);
    res.send("Error loading profile.");
  }
});

module.exports = router;
