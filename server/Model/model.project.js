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
  millestones: [
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
      status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["Complete", "Incomplete"],
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
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

// const ProjectSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required"],
//     trim: true,
//     unique: true,
//   },
//   description: {
//     type: String,
//     required: [true, "Description is required"],
//   },
//   keywords: {
//     type: [String],
//   },
//   fundingSource: String,
//   accessControl: {
//     type: String,
//     required: [true, "Access control is required"],
//     enum: ["Public", "Private", "Collaborator"],
//   },
//   data: {
//     type: [
//       {
//         name: {
//           type: String,
//           required: [true, "Data name is required"],
//         },
//         description: String,
//         dataUrl: {
//           type: String,
//           required: [true, "Data URL is required"],
//         },
//         format: String,
//       },
//     ],
//     validate: {
//       validator: (data) => data.length > 0,
//       message: "At least one data item is required",
//     },
//   },
//   methodology: String,
//   analysisTools: [String],
//   milestones: {
//     type: [
//       {
//         name: {
//           type: String,
//           required: [true, "Milestone name is required"],
//         },
//         deadline: Date,
//       },
//     ],
//     validate: {
//       validator: (milestones) => milestones.length > 0,
//       message: "At least one milestone is required",
//     },
//   },
//   tasks: {
//     type: [
//       {
//         name: {
//           type: String,
//           required: [true, "Task name is required"],
//         },
//         completed: {
//           type: Boolean,
//           default: false,
//         },
//       },
//     ],
//     validate: {
//       validator: (tasks) => tasks.length > 0,
//       message: "At least one task is required",
//     },
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     // required: [true, "Creator is required"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

module.exports = mongoose.model("Project", ProjectSchema);
