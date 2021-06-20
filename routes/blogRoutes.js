const express = require("express");
const router = express.Router();
const blog = require("../models/blogSchema");

router.get("/blogs", async (req, res) => {
  try {
    await blog.findOne({ email: "anagh9931@gmail.com" }, (err, foundPost) => {
      if (err) console.log(err.message);
      res.render("./pages/blogs", { posts: foundPost.posts });
    });
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/blog/:posttitle", async (req, res) => {
  try {
    await blog.findOne({ email: "anagh9931@gmail.com" }, (err, foundPost) => {
      if (!foundPost) {
        res.send("User not registered");
        console.log("User not Registered");
      } else {
        requestedtitle = req.params.posttitle.replace("-", " ");
        let postContent, postImage;
        foundPost.posts.forEach((post) => {
          if (post.posttitle === requestedtitle) {
            postContent = post.postcontent;
            postImage = post.postimage;
          }
        });
        res.render("pages/blogsPages", {
          title: "Anagh Portfolio",
          requestedtitle,
          postImage,
          postContent,
        });
      }
    });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
