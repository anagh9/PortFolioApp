const express = require("express");
const app = express();
const path = require("path");
var session = require("express-session");
require("dotenv").config();
require("./models/conn");

const Port = process.env.PORT || 5000;
const blog = require("./models/blogSchema");

const data = require("./models/schema");
const staticPath = path.join(__dirname, "/public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(staticPath));
app.use(session({ secret: "Shh, its a secret!" }));

app.get("/", (req, res) => {
  res.render("./pages/index");
});

app.get("/about", (req, res) => {
  res.render("./pages/about");
});

app.get("/service", (req, res) => {
  res.render("./pages/services");
});

app.get("/projects", (req, res) => {
  res.render("./pages/projects");
});

app.get("/blogs", async (req, res) => {
  try {
    await blog.findOne({ email: "anagh9931@gmail.com" }, (err, foundPost) => {
      if (err) console.log(err.message);
      res.render("./pages/blogs", { posts: foundPost.posts });
    });
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/contact", (req, res) => {
  res.render("./pages/contact");
});

app.post("/contact", async (req, res) => {
  const formData = new data(req.body);
  try {
    await formData.save();
    res.redirect("/contact");
  } catch (e) {
    res.status(400).send(e);
  }
});
app.use(express.static(staticPath));

app.get("/blog/:posttitle", async (req, res) => {
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

app.get("/register", (req, res) => {
  res.render("./pages/register");
});

app.post("/email", async (req, res) => {
  const user = {
    email: req.body.email,
  };
  const userdetails = new blog(user);
  await userdetails.save();
  res.redirect("/register");
});

app.post("/register", (req, res) => {
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

app.listen(Port, () => {
  console.log(`App running on ${Port}`);
});
