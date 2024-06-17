const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  researchInterests: {
    type: [String],
    default: [],
  },
  bio: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
