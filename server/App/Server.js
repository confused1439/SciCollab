// App.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("../Router/routes");

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log("Failed to connect!");
  });

app.use("/", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
