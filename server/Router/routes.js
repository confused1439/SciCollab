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
const CollaborationRequestController = require("../Controllers/CollaborationRequestController");
const {
  createVisualization,
} = require("../Controllers/DatavisualizationController");

// Routes
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/update-user/:userId", UserController.updateUser);
router.get("/logout", UserController.logout);
router.get("/get-user/:userId", UserController.getUser);
router.get("/get-users", UserController.getUsers);

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

// Routes for collaborationRequest
router.post("/send-request", CollaborationRequestController.sendRequest);
router.get(
  "/requests/:userId",
  CollaborationRequestController.getRequestsForUser
);
router.put("/respond-request", CollaborationRequestController.respondToRequest);

// Data Visualization
router.post("/data-visual", createVisualization);
module.exports = router;
