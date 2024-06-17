const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/model.user");

module.exports = {
  // Function to get all users
  async getUsers(req, res) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(err);
      res.status(500).json({ message: "Error fetching users" });
    }
  },

  // Function to register a user
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
        redirectUrlForLogin,
        success: true,
        alert: { type: "success", message: "Account created successful!" },
      });
      console.log("Signup successful!");
    } catch (error) {
      console.error("Error signing up user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Function to loggin a user
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
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "vivek",
        {
          expiresIn: "1h",
        }
      );

      // Redirect to user profile page with user ID
      const redirectUrl = `/projects/${user._id}`;

      res.status(200).json({
        userId: user._id,
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
    const redirectToHome = "/";
    res.status(200).json({
      success: true,
      redirectToHome,
      message: "Logout successful",
    });
  },

  // get the user
  async getUser(req, res) {
    const { userId } = req.params;

    try {
      // Find the user by userId
      const user = await UserModel.findById(userId);

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          error: "User not found",
          alert: {
            type: "danger",
            message: "User with the provided ID not found",
          },
        });
      }

      // If user exists, return user data
      res.status(200).json({
        user,
        success: true,
        alert: { type: "success", message: "User data retrieved successfully" },
      });

      console.log("User data retrieved successfully!");
    } catch (error) {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update user
  // async updateUser(req, res) {
  //   const { userId } = req.params;
  //   const updateData = req.body;

  //   try {
  //     // Find the user by userId and update the data
  //     const updatedUser = await UserModel.findByIdAndUpdate(
  //       userId,
  //       updateData,
  //       {
  //         new: true, // Return the updated document
  //         runValidators: true, // Run validators to ensure the updated data meets the schema requirements
  //       }
  //     );

  //     // Check if user exists
  //     if (!updatedUser) {
  //       return res.status(404).json({
  //         error: "User not found",
  //         alert: {
  //           type: "danger",
  //           message: "User with the provided ID not found",
  //         },
  //       });
  //     }

  //     // If user is found and data is updated successfully, return the updated user data
  //     res.status(200).json({
  //       user: updatedUser,
  //       success: true,
  //       alert: { type: "success", message: "User data updated successfully" },
  //     });

  //     console.log("User data updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // },
  async updateUser(req, res) {
    const { userId } = req.params;
    const updateData = req.body;

    try {
      // Find the user by userId
      let user = await UserModel.findById(userId);

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          error: "User not found",
          alert: {
            type: "danger",
            message: "User with the provided ID not found",
          },
        });
      }

      // Update only the fields that are provided in the request body
      Object.keys(updateData).forEach((key) => {
        if (updateData[key]) {
          user[key] = updateData[key];
        }
      });

      // Save the updated user
      const updatedUser = await user.save();

      // Return the updated user data
      res.status(200).json({
        user: updatedUser,
        success: true,
        alert: { type: "success", message: "User data updated successfully" },
      });

      console.log("User data updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
