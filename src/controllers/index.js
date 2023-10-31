const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
//const checkAuth = require("../middleware/checkauth");
 const Article = require("../model/articlePost");
 const BreakingNews = require('../model/breakingNews');

const router = express.Router();
app.use(cookieParser());
app.use(bodyParser.json());

router.get("/", async (req, res) => {
    try {
      const breakingNews = await BreakingNews.find().sort('-timestamp');
      const carouselArticles = await Article.find({
        articleCategory: "Carousel",
        status: "Approved",
      })
        .limit(5)
        .populate("author", "username");
  
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
      })
        .limit(6)
        .sort({ createdAt: -1 })
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
      })
        .limit(6)
        .sort({ createdAt: -1 })
        .populate("author", "username");

        const decodedToken = jwt.decode(req.cookies.token); 
        const username = decodedToken ? decodedToken.username : null;
  
      res.render("indexview", {
        username,
        carouselArticles,
        featuredArticles,
        latestArticle,
        breakingNews
      });
    } catch (err) {
      console.log(err);
      res.send("Error fetching articles");
    }
  });

  router.get("/education", async (req, res) => {
    try {
      const breakingNews = await BreakingNews.find().sort('-timestamp');
      const carouselArticles = await Article.find({
        articleCategory: "Carousel",
        status: "Approved",
        category: "education",
      })
        .limit(5)
        .populate("author", "username");
  
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
        category: "education",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
        category: "education",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
        const decodedToken = jwt.decode(req.cookies.token); 
        const username = decodedToken ? decodedToken.username : null;
  
      res.render("indexview", {
        username,
        carouselArticles,
        featuredArticles,
        latestArticle,
        breakingNews
      });
    } catch (err) {
      console.log(err);
      res.send("Error fetching articles");
    }
  });

  router.get("/technology", async (req, res) => {
    try {
      const breakingNews = await BreakingNews.find().sort('-timestamp');
      const carouselArticles = await Article.find({
        articleCategory: "Carousel",
        status: "Approved",
        category: "technology",
      })
        .limit(5)
        .populate("author", "username");
  
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
        category: "technology",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
        category: "technology",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
        const decodedToken = jwt.decode(req.cookies.token); 
        const username = decodedToken ? decodedToken.username : null;
  
      res.render("indexview", {
        username,
        carouselArticles,
        featuredArticles,
        latestArticle,
        breakingNews
      });
    } catch (err) {
      console.log(err);
      res.send("Error fetching articles");
    }
  });

  router.get("/politics", async (req, res) => {
    try {
      const breakingNews = await BreakingNews.find().sort('-timestamp');
      const carouselArticles = await Article.find({
        articleCategory: "Carousel",
        status: "Approved",
        category: "politics",
      })
        .limit(5)
        .populate("author", "username");
  
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
        category: "politics",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
        category: "politics",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
        const decodedToken = jwt.decode(req.cookies.token); 
        const username = decodedToken ? decodedToken.username : null;
  
      res.render("indexview", {
        username,
        carouselArticles,
        featuredArticles,
        latestArticle,
        breakingNews
      });
    } catch (err) {
      console.log(err);
      res.send("Error fetching articles");
    }
  });
  router.get("/entertainment", async (req, res) => {
    try {
      const breakingNews = await BreakingNews.find().sort('-timestamp');
      const carouselArticles = await Article.find({
        articleCategory: "Carousel",
        status: "Approved",
        category: "entertainment",
      })
        .limit(5)
        .populate("author", "username");
  
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
        category: "entertainment",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
        category: "entertainment",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
        const decodedToken = jwt.decode(req.cookies.token); 
        const username = decodedToken ? decodedToken.username : null;
  
      res.render("indexview", {
        username,
        carouselArticles,
        featuredArticles,
        latestArticle,
        breakingNews
      });
    } catch (err) {
      console.log(err);
      res.send("Error fetching articles");
    }
  });


  router.get("/other", async (req, res) => {
    try {
      const breakingNews = await BreakingNews.find().sort('-timestamp');
      const carouselArticles = await Article.find({
        articleCategory: "Carousel",
        status: "Approved",
        category: "other",
      })
        .limit(5)
        .populate("author", "username");
  
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
        category: "other",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
        category: "other",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
        const decodedToken = jwt.decode(req.cookies.token); 
        const username = decodedToken ? decodedToken.username : null;
  
      res.render("indexview", {
        username,
        carouselArticles,
        featuredArticles,
        latestArticle,
        breakingNews
      });
    } catch (err) {
      console.log(err);
      res.send("Error fetching articles");
    }
  });


  router.get("/:urlTitle", async (req, res) => {
    try {
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
        return res.status(404).send("Article not found ");
      }
      
      const featuredArticles = await Article.find({
        articleCategory: "Featured",
        status: "Approved",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
  
      const latestArticle = await Article.find({
        articleCategory: "Normal",
        status: "Approved",
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .populate("author", "username");
        
      article.views++;
      await article.save();
      
      const decodedToken = jwt.decode(req.cookies.token); 
      const username = decodedToken ? decodedToken.username : null;
      
      res.render("blogview", {
        article,
        username,
        featuredArticles,
        latestArticle,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching article");
    }
  });

  module.exports = router;
  
