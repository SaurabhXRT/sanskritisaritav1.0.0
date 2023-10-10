const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const User = require("../model/userModel");
const db = require("../config/db");
const router = express.Router();
app.use(bodyParser.json());
const SecretKey = require("../config/crypto");

// Define a secret key for JWT
const jwtSecret = SecretKey ;

router.post("/signuppost", async (req, res) => {
  try {
    const { name, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.send("Passwords don't match");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign({ username: newUser.username }, jwtSecret, { expiresIn: "1h" });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })
    );

    res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.send("Error during signup");
  }
});

router.post("/loginpost", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.send("User not found");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: "1h" });
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        })
      );

      if (user.isAdmin && isPasswordValid) {
        res.redirect("/admin/adminuser");
      } else {
        // const redirectURL = req.query.redirect || "/home";  
        res.redirect("/");
      }
    } else {
      res.send("Invalid password");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  res.redirect("/");
});

module.exports = router;







// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const path = require("path");
// const User = require("../model/userModel");
// const db = require("../config/db");
// const router = express.Router();
// app.use(bodyParser.json());

// router.post("/signuppost", async (req, res) => {
//     try {
//       const { name, username, password, confirmPassword } = req.body;

//       if (password !== confirmPassword) {
//         return res.send("Passwords don't match");
//       }

//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.send("Username already exists");
//       }
//       const newUser = new User({
//         name,
//         username,
//         password,
//       });

//       await newUser.save();

//       /* req.session.username = newUser.username;
//       console.log(newUser);
//       return res.redirect("/home");*/
//       if (req.session.redirectTo) {
//         const redirectTo = req.session.redirectTo;
//         delete req.session.redirectTo;
//         res.redirect(redirectTo);
//       } else {
//         req.session.username = newUser.username;
//         res.redirect("/home");
//       }
//     } catch (err) {
//       console.log(err);
//       return res.send("Error during signup");
//     }
//   });

//   router.post("/loginpost", async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await User.findOne({ username });

//       if (!user) {
//         res.send("User not found");
//         return;
//       }
//       if (user.isAdmin && user.password === password) {
//         req.session.username = user.username;
//         res.redirect("/admin/adminuser");
//       } else if (!user.isAdmin && user.password === password) {
//         /* else if (!user.isAdmin && user.password === password) {
//         req.session.username = user.username;
//         res.redirect("/home");
//       } */
//         if (req.session.redirectTo) {
//           const redirectTo = req.session.redirectTo;
//           delete req.session.redirectTo;
//           req.session.username = user.username;
//           return res.redirect(redirectTo); // Use return to prevent further execution
//         } else {
//           req.session.username = user.username;
//           return res.redirect("/home"); // Use return to prevent further execution
//         }
//       } else {
//         res.send("Invalid password");
//       }
//     } catch (err) {
//       console.log(err);
//       res.send(err);
//     }
//   });

//   router.get("/logout", (req, res) => {
//     req.session.destroy((err) => {
//       if (err) {
//         console.log(err);
//       }
//       res.redirect("/");
//     });
//   });
//   module.exports = router;

