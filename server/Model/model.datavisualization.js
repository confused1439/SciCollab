const mongoose = require("mongoose");

const visualizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["bar", "line", "scatter"], // Types of visualizations supported
    required: true,
  },
  data: [
    {
      x: {
        type: String,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
  ],
  configuration: {
    color: { type: String },
    xAxisLabel: { type: String },
    yAxisLabel: { type: String },
    title: { type: String }, // Added title property
    barWidth: { type: Number }, // Added barWidth property
    barPadding: { type: Number }, // Added barPadding property
    xAxisTicks: { type: Number }, // Added xAxisTicks property
    yAxisTicks: { type: Number }, // Added yAxisTicks property
  },
});

module.exports = mongoose.model("Visualization", visualizationSchema);
