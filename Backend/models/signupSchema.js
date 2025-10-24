// import { User } from "lucide-react";
import mongoose from "mongoose";
const signup = new mongoose.Schema({
  name: {
    type:String,
    unique: true,
    required: true,
  },
  email: {
    type:String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  Affiliation: {
    type: String,
    required: true,
    enum: {
      values: [
        "IIT INDORE",
        "Academic Institution",
        "Industry",
        "Research Center",
        "International",
      ],
      message: "Affiliation is required",
    },
  },
});
const User = mongoose.model("signup", signup);
export default User;
