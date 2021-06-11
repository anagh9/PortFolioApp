const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: String,
  _replyto: String,
  message: String,
});

const data = new mongoose.model("portfolioData", dataSchema);
module.exports = data;
