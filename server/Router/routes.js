const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");
const forumController = require("../Controllers/ForumController");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../Controllers/ProjectController");
const { createDemo, getDemos } = require("../Controllers/DemoController");

// Routes
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.post("/search", UserController.search);

// Routes for projects
router.post("/create-project", createProject); // Create a new project
router.get("/get-projects", getProjects); // Get all projects (can be filtered later)
router.get("/get-project/:projectId", getProjectById); // Get a project by ID
router.put("/update-project/:projectId", updateProject); // Update a project
router.delete("/delete-project/:projectId", deleteProject); // Delete a project

// Routes for forum
router.get("/get-forums", forumController.getAllForumPosts);
router.post("/create-forum", forumController.createForumPost);
router.delete("/delete-forum/:id", forumController.deleteForumPost);

// Routes for demos
router.post("/create-demo", createDemo);
router.get("/getdemos", getDemos);

module.exports = router;
