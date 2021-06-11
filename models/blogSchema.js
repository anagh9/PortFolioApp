const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    posttitle: String,
    postimage: String,
    postdate: String,
    postcontent:String,
});

const UserSchema =new mongoose.Schema({
    email:String,
    posts:[postSchema],
});



const posts = new mongoose.model("blogPosts",UserSchema);

module.exports = posts;