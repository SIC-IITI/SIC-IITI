import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
  },
  Affiliation: {
    type: String,
    required: true,
    enum: [
      "IIT INDORE",
      "Academic Institution",
      "Industry",
      "Research Center",
      "International",
    ],
  },
});

const User = mongoose.model("User", signupSchema);
export default User;
