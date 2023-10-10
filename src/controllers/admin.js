const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//const path = require("path");
const User = require("../model/userModel");
const db = require("../config/db");
const Article = require("../model/articlePost");
//const Comment = require("./model/commentModel");

const checkAuth = require("../middleware/checkauth");

const router = express.Router();
app.use(cookieParser());
app.use(bodyParser.json());

router.get("/adminuser", checkAuth, async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.token); 
    if (!decodedToken) {
      return res.status(401).send("Unauthorized");
    }

    const username = decodedToken.username;
    const user = await User.findOne({ username });
    if(!user.isAdmin){
      return res.send("you are not authorized to access this");
    }
    const pendingArticles = await Article.find({ status: "Pending" })
      .sort({ createdAt: -1 })
      .populate("author", "username");

    res.render("admin", { pendingArticles });
  } catch (err) {
    console.log(err);
    res.send("Error fetching pending articles");
  }
});

router.post("/verifyArticle/:articleId", checkAuth, async (req, res) => {
  const { status, category } = req.body;
  const articleId = req.params.articleId;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).send("Article not found.");
    }

    article.status = status;
    article.articleCategory = category;

    await article.save();

    // res.redirect('/admin');
    res.send("article verified");
  } catch (err) {
    console.error("Error verifying article:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/viewpendingarticle/:urlTitle", checkAuth, async (req, res) => {
  try {
    /* const articleId = req.params.id;
      const article = await Article.findById(articleId)*/
    const urlTitle = req.params.urlTitle;
    const article = await Article.findOne({ urlTitle })
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
        options: { sort: { createdAt: -1 }, strictPopulate: false },
      })
      .sort({ createdAt: -1 });
    if (!article) {
      return res.status(404).send("Article not found");
    }
    article.views++;
    await article.save();
    const username = req.session.username || null;
    res.render("viewpendingarticle", {
      article,
      username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching article");
  }
});

module.exports = router;
