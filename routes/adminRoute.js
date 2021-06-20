const express = require("express");
const router = express.Router();

const blog = require("../models/blogSchema");

router.get("/register", (req, res) => {
  res.render("./pages/register");
});

router.post("/email", async (req, res) => {
  const user = {
    email: req.body.email,
  };
  const userdetails = new blog(user);
  await userdetails.save();
  res.redirect("/register");
});

router.post("/register", (req, res) => {
  try {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    postDetails = {
      posttitle: req.body.posttitle,
      postimage: req.body.postimage,
      postdate: date,
      postcontent: req.body.postcontent,
    };

    blog.findOne({ email: "anagh9931@gmail.com" }, (err, found) => {
      if (err) console.log(err);
      else {
        if (found) {
          found.posts.push(postDetails);
          found.save(() => {
            res.redirect("/register");
          });
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
