// import jwt from "jsonwebtoken";
// import User from "../models/signupSchema.js";

// const JWT_SECRET = "SECRET KEY";

// export const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: "No token provided" });
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };

// export const isAdmin = async (req, res, next) => {
//   const user = await User.findById(req.user.userId);
//   if (!user || !user.isAdmin)
//     return res.status(403).json({ message: "Access denied" });
//   next();
// };
import jwt from "jsonwebtoken";
import User from "../models/signupSchema.js";

// Authenticate JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Check if user is active (if you have this field)
    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "User account is deactivated",
      });
    }

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: user.role || "user",
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error authenticating token",
      error: error.message,
    });
  }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check if user has admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking admin status",
      error: error.message,
    });
  }
};

// Optional: Check for specific roles
export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(", ")}`,
      });
    }

    next();
  };
};

// Optional: Verify user owns the resource
export const verifyOwnership = (Model, paramKey = "id") => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[paramKey];
      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }

      // Check if user owns the resource or is admin
      if (
        resource.user.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied. You don't own this resource.",
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error verifying ownership",
        error: error.message,
      });
    }
  };
};

// Optional: Async handler wrapper to avoid try-catch in every route
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};