import express from "express";
import cors from "cors";
import connectdb from "./config/database.js";
import userRoutes from "./routes/Signup.js"; 

const PORT = process.env.PORT || 5000;
const app = express();

// connect MongoDB
connectdb();

// middlewares
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// user routes
app.use("/api/user", userRoutes);

// fallback error handling
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
