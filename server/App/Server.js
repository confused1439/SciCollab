// App.js
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require('cors')
const mongoose = require("mongoose");
const app = express();
const route = require("../Router/routes");

app.use(express.json());

app.use(cors(
  {
    origin: ["https://sci-collab-swart.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
))

app.use(
  session({
    secret: "SciCollab",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Use 'true' if you're using HTTPS
      httpOnly: true,
      maxAge: 3600000, // Session expires after 1 hour
    },
  })
);

const URI =
  "mongodb+srv://viveksaradva:vivek123@scicollabdb.1vllt7j.mongodb.net/scicollabSpace?retryWrites=true&w=majority&appName=SciCollabDB";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || URI)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect!", err);
  });

app.use("/", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
