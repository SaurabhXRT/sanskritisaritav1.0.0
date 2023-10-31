const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const fileupload = require("express-fileupload");
app.use(fileupload({ useTempFiles: true }));
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/db");
const checkAuth = require("./middleware/checkauth");
const bcrypt = require('bcrypt');
const User = require("./model/userModel");
const Article = require("./model/articlePost");
const Comment = require("./model/commentModel");

// const SecretKey = require("./config/crypto");

// // Define a secret key for JWT
// const jwtSecret = SecretKey ;

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});

cloudinary.config({
  cloud_name: "dar4ws6v6",
  api_key: "131471632671278",
  api_secret: "d0UW2ogmMnEEMcNVcDpzG33HKkY",
});

// Custom helper function to format the date as "dd/mm/yyyy"
hbs.registerHelper("formatDate", (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  return formattedDate;
});

// Set up express-session
// app.use(
//   session({
//     secret: jwtSecret,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// const adminUsername = "gautamkumar";
// const adminPassword = "hellogautam";

// (async () => {
//   try {
 
//     const existingAdmin = await User.findOne({ username: adminUsername });
//     if (!existingAdmin) {
     
//       const hashedPassword = await bcrypt.hash(adminPassword, 10); 
//       await User.create({
//         name: "Admin",
//         username: adminUsername,
//         password: hashedPassword, 
//         isAdmin: true,
//       });
//       console.log("Admin user created successfully!");
//     } else {
//       console.log("Admin user already exists.");
//     }
//   } catch (err) {
//     console.error("Error creating admin user:", err);
//   }
// })();

app.use(express.static(path.join(__dirname, "../public")));
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const template_path = path.join(__dirname, "../views");

app.set("views", template_path);
app.set("view engine", "hbs");



const articleController = require("./controllers/article");
app.use("/post", articleController);

const authController = require("./controllers/auth");
app.use("/auth", authController);

const userController = require("./controllers/user");
app.use("/user", userController);

const adminController = require("./controllers/admin");
app.use("/admin", adminController);

const messageController = require("./controllers/message");
app.use("/message", messageController);

// const homeController = require("./controllers/admin");
// app.use("/home", homeController);

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/article", checkAuth, (req, res) => {
  res.render("articlewrite");
});



// app.post("/like-post/:id", checkAuth, async  (req, res) => {
//   const articleId = req.params.id;

//   try {
//     const post = await Article.findById(articleId);
//     if (!post) {
//       return res.status(404).send("article not found");
//     }
//     if (!res.locals.username) {
//       // User is not logged in, handle as desired (redirect or error response)
//       return res.redirect("/login");
//   }

//     const decodedToken = jwt.decode(req.cookies.token); 
//     const username = decodedToken.username
//     const user = await User.findOne({ username });

//     const userLikedPost = post.likes.some((like) => {
//       return like.user.toString() === user._id.toString();
//     });

//     if (userLikedPost) {
//       post.likes = post.likes.filter((like) => {
//         return like.user.toString() !== user._id.toString();
//       });
//     } else {
//       post.likes.push({
//         user: user._id,
//       });
//     }

//     await post.save();
//     const likesCount = post.likes.length;
//     console.log("like added");
//     res.json({ likesCount });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }
// });

// app.post("/comment", checkAuth, async (req, res) => {
//   try {

//     const { comment, postid } = req.body;
//     const decodedToken = jwt.decode(req.cookies.token);
//     const username = decodedToken.username
//     const userid = await User.findOne({ username });
//     const user = userid._id;

//     const commentNew = new Comment({
//       comment,
//       author: user,
//     });
//     await commentNew.save();

//     const article = await Article.findById(postid);
//     article.comments.push(commentNew._id);
//     await article.save();

//     console.log("comment added");

//     // Send the response as JSON
//     const userr = await User.findById(user);
//     const response = {
//       postid: postid,
//       username: userr.username,
//       comment: comment,
//     };
//     res.json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error adding comment");
//   }
// });




const indexController = require("./controllers/index");
app.use("/", indexController);

//app listening
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
