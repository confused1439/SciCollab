// controllers/UserController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/model.user");

module.exports = {
  async signup(req, res) {
    const { username, email, password } = req.body;

    try {
      // Check if username already exists
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          error: "Username already exists",
          alert: { type: "warning", message: "Choose some other username!" },
        });
      }

      // Check if email already exists
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          error: "Email already exists",
          alert: { type: "warning", message: "Choose some other email!" },
        });
      }

      // Validate password (e.g., minimum length, special characters, etc.)
      if (password.length < 7) {
        return res.status(400).json({
          error: "Password too weak!",
          alert: {
            type: "warning",
            message: "Password must be at least 7 characters long",
          },
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance with hashed password
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();

      const redirectUrlForLogin = "/";
      // Successful signup
      res.status(201).json({
        success: true,
        redirectUrlForLogin,
        alert: { type: "success", message: "Account created successful!" },
      });
      console.log("Signup successful!");
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Check if user exists with the provided email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({
          error: "Email not found in the database",
          alert: {
            type: "danger",
            message: "Email not found, you have to signup first !",
          },
        });
      }

      // Check if password matches
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          error: "Invalid email or password",
          alert: { type: "warning", message: "Invalid credentials!" },
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const redirectUrl = `/user-profile?userId=${encodeURIComponent(
        user._id
      )}`;

      res.status(200).json({
        userName: user.username,
        success: true,
        redirectUrl,
        token,
        alert: { type: "success", message: "Login successful!" },
      });
      console.log("Login successful!");
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //   Logout
  logout(req, res) {
    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  },

  //Search
  async search(req, res) {
    const { query } = req.body;

    try {
      // Search for users with matching username or email
      const results = await UserModel.find({
        $or: [
          { username: { $regex: query, $options: "i" } }, // Case-insensitive regex match for username
          { email: { $regex: query, $options: "i" } }, // Case-insensitive regex match for email
        ],
      });

      res.status(200).json({ success: true, results });
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
