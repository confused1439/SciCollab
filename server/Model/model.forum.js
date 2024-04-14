const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
});

const ForumPost = mongoose.model("ForumPost", forumPostSchema);

module.exports = ForumPost;
