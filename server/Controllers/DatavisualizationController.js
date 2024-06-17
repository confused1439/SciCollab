const Visualization = require("../Model/model.datavisualization");

exports.createVisualization = async (req, res) => {
  try {
    // Extract data and configuration from request body
    const { name, type, data, configuration } = req.body;

    // Create a new visualization
    const visualization = new Visualization({
      name,
      type,
      data,
      configuration,
    });

    // Save the visualization to the database
    const savedVisualization = await visualization.save();

    res.status(201).json(savedVisualization);
  } catch (error) {
    console.error("Error creating visualization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
