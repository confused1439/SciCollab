const Demo = require("../Model/model.demo");

// exports.createDemo = async (req, res) => {
//   try {
//     const { name, descriptions, status, category } = req.body;

//     const newDemo = new Demo({
//       name,
//       descriptions,
//       status,
//       category,
//     });

//     await newDemo.save();

//     res.status(201).json({
//       message: "Demo created successfully",
//       demo: newDemo,
//     });
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       const errors = {};
//       Object.keys(err.errors).forEach((key) => {
//         errors[key] = err.errors[key].message;
//       });
//       return res.status(400).json({ message: "Validation error", errors });
//     } else {
//       console.error("Error creating demo:", err);
//       return res.status(500).json({ message: "Error creating demo" });
//     }
//   }
// };

exports.createDemo = async (req, res) => {
  try {
    const { name, descriptions, status, category } = req.body;

    // Validate that descriptions is an array and not empty
    if (!Array.isArray(descriptions) || descriptions.length === 0) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          descriptions: "Descriptions must be an array with at least one value",
        },
      });
    }

    if (!Array.isArray(status) || status.length === 0) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          status: "status must be an array with at least one value",
        },
      });
    }

    const newDemo = new Demo({
      name,
      descriptions,
      status,
      category,
    });

    await newDemo.save();

    res.status(201).json({
      message: "Demo created successfully",
      demo: newDemo,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: "Validation error", errors });
    } else {
      console.error("Error creating demo:", err);
      return res.status(500).json({ message: "Error creating demo" });
    }
  }
};

exports.getDemos = async (req, res) => {
  try {
    const demos = await Demo.find();
    res.status(200).json(demos);
  } catch (err) {
    console.error("Error fetching demos:", err);
    res.status(500).json({ message: "Error fetching demos" });
  }
};
