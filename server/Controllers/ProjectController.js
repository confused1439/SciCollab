const mongoose = require("mongoose");
const Project = require("../Model/model.project");

// Create new project
exports.createProject = async (req, res) => {
  const userId = req.params.userId;
  const {
    name,
    description,
    keywords,
    fundingSource,
    accessControl,
    data,
    methodology,
    analysisTools,
    milestones,
    tasks,
  } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      keywords,
      fundingSource,
      accessControl,
      data,
      methodology,
      analysisTools,
      milestones,
      tasks,
      // createdBy: userId,
    });

    await newProject.save();

    res.status(201).json({
      id: newProject._id,
      ...newProject._doc,
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: "Validation error", errors });
    } else {
      console.error("Error creating project:", err);
      return res.status(500).json({ message: "Error creating project" });
    }
  }
};

// Function to get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Function to get a single project by ID
exports.getProjectById = async (req, res) => {
  const projectId = req.params.projectId;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching project" });
  }
};

// Function to update a project
exports.updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await Project.findByIdAndUpdate(projectId, updates, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating project" });
  }
};

// Function to delete a project
exports.deleteProject = async (req, res) => {
  const projectId = req.params.projectId;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  try {
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting project" });
  }
};
