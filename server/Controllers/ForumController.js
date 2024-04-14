const ForumPost = require("../Model/model.forum");

exports.getAllForumPosts = async (req, res) => {
  try {
    const forumPosts = await ForumPost.find();
    res.json(forumPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createForumPost = async (req, res) => {
  const forumPost = new ForumPost({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  });

  try {
    const newForumPost = await forumPost.save();
    res.status(201).json({ id: newForumPost._id, ...newForumPost._doc }); // Return the ID along with the forum post data
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteForumPost = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the forum by id and delete it
    await ForumPost.findByIdAndDelete(id);
    res.status(200).json({ message: "Forum deleted successfully." });
  } catch (error) {
    console.error("Error deleting forum:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
