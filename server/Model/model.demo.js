const mongoose = require("mongoose");

const DemoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true,
    },
    descriptions: {
      type: [String],
      required: [true, "At least one description is required"],
    },

    status: {
      type: [String],
      required: [true, "Status is required"],
      enum: ["complete", "incomplete"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["category1", "category2", "category3"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Demo", DemoSchema);
