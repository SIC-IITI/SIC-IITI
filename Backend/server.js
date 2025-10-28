// import express from "express";
// import cors from "cors";
// import connectdb from "./config/database.js";
// import userRoutes from "./routes/Signup.js";
// import bookingRoutes from "./routes/Booking.js";
// import adminBookingRoutes from "./routes/Adminbooking.js";

// const PORT = process.env.PORT || 5000;
// const app = express();

// // Connect MongoDB
// connectdb();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Health check
// app.get("/", (req, res) => {
//   res.json({ status: "OK", message: "Server is running 🚀" });
// });

// // Routes
// app.use("/api/user", userRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/admin/bookings", adminBookingRoutes);

// // Error handling
// app.use((err, req, res, next) => {
//   console.error("Unhandled Error:", err);
//   res.status(500).json({ message: "Internal Server Error", error: err.message });
// });

// app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectdb from "./config/database.js";
import userRoutes from "./routes/Signup.js";
import bookingRoutes from "./routes/Booking.js";
import adminBookingRoutes from "./routes/Adminbooking.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to MongoDB
connectdb();

// Security middleware
app.use(helmet()); // Adds security headers

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to API routes
app.use("/api", limiter);

// Stricter rate limit for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication attempts, please try again later.",
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Instrumentation Booking API Server",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    database: "connected",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/user", authLimiter, userRoutes); // User authentication routes
app.use("/api/bookings", bookingRoutes); // User-facing booking routes
app.use("/api/admin/bookings", adminBookingRoutes); // Admin-only booking routes

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value entered",
      field: Object.keys(err.keyPattern)[0],
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  Instrumentation Booking API Server                   ║
║  Server running at http://localhost:${PORT}           ║
║  Environment: ${process.env.NODE_ENV || "development"}                         ║
║  Status: Ready to accept connections                  ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});

export default app;