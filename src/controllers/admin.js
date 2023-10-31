const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../model/userModel");
const db = require("../config/db");
const Article = require("../model/articlePost");
const Contact = require("../model/userContact");
const BreakingNews = require('../model/breakingNews');

const checkAuth = require("../middleware/checkauth");

const router = express.Router();
app.use(cookieParser());
app.use(bodyParser.json());

router.get("/submitbreakingnews",  checkAuth, (req, res) => {
  res.render("breakingnewspage");
})

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

router.get('/message', checkAuth, async (req, res) => {
  try {
    const messages = await Contact.find();
    res.render('messages', { messages }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching messages');
  }
});

router.post('/breaking-news', checkAuth, async (req, res) => {
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
    const { title} = req.body;
    const breakingNews = new BreakingNews({ 
      title, 
      admin: username,
    });
    await breakingNews.save();
    res.status(201).send("breaking news submitted successfully.. go back");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating breaking news' });
  }
});

module.exports = router;
