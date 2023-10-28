const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const bodyParser = require("body-parser");
const User = require("../model/userModel");
const Article = require("../model/articlePost");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/checkauth");

const fileupload = require("express-fileupload");

app.use(fileupload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: "dar4ws6v6",
  api_key: "131471632671278",
  api_secret: "d0UW2ogmMnEEMcNVcDpzG33HKkY",
});

const router = express.Router();

app.use(bodyParser.json());

router.post("/articlepost", checkAuth, async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.token); 
    if (!decodedToken) {
      return res.status(401).send("Unauthorized");
    }

    const username = decodedToken.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found.");
    }
    //const image = req.file ? req.file.path : null;
    //const imageFile = req.files.image;
    //const file = req.files.image;
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "uploads",
    });

    /* if (!req.files || !req.files.postimage) {              
        return res.status(400).json({ error: "Image file is missing." });
      }*/

    /* cloudinary.uploader.upload(
        imageFile.tempFilePath,
        async (error, result) => {
          if (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return res.status(500).send("Error uploading image.");
          }*/

    const postimage = result.secure_url;
    //const data = await uploadToCloudinary(req.file.path, "articleimages");
    // const articleContentWithLineBreaks = req.body.article.replace(
    //   /\n/g,
    //   "<br>"
    // );
    const newArticle = new Article({
      title: req.body.title,
      headingtitle: req.body.headingtitle,
      description: req.body.description,
      keywords: req.body.keywords,
      category: req.body.category,
      article: req.body.article,
      postimage,
      author: user._id,
    });

    await newArticle.save();
    user.articles.push(newArticle._id);
    await user.save();

    const message =
      "Your article has been submitted for review. Please wait for verification.";
    res.json({ message });
  } catch (err) {
    console.error("Error posting article:", err);
    res.send("Error posting article");
  }
});


module.exports = router;
