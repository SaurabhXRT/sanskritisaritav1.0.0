const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const fileupload = require("express-fileupload");
app.use(fileupload({ useTempFiles: true }));
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

hbs.registerHelper("formatDate", (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  return formattedDate;
});


// const adminUsername = "";
// const adminPassword = "";

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

app.get("/privacy-policy", (req, res) =>{
  res.render("privacypolicy");
})

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/article", checkAuth, (req, res) => {
  res.render("articlewrite");
});


const indexController = require("./controllers/index");
app.use("/", indexController);

//app listening
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
