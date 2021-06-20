const express = require("express");
const router = express.Router();
const data = require("../models/schema");

router.post("/contact", async (req, res) => {
  const formData = new data(req.body);
  try {
    await formData.save();
    res.redirect("/contact");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/", (req, res) => {
  res.render("./pages/index");
});

router.get("/about", (req, res) => {
  res.render("./pages/about");
});

router.get("/service", (req, res) => {
  res.render("./pages/services");
});

router.get("/projects", (req, res) => {
  res.render("./pages/projects");
});

router.get("/contact", (req, res) => {
  res.render("./pages/contact");
});

module.exports = router;
