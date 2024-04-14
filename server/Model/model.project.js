const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
  },
  fundingSource: String,
  accessControl: {
    type: String,
    required: true,
    enum: ["Public", "Private", "Collaborator"],
  },
  data: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
      dataUrl: {
        type: String,
        required: true,
      },
      format: String,
    },
  ],
  methodology: String,
  analysisTools: [String],
  milestones: [
    {
      name: {
        type: String,
        required: true,
      },
      deadline: Date,
    },
  ],
  tasks: [
    {
      name: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
