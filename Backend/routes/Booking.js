
import express from "express";
import Booking from "../models/bookingSchema.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

// Validation helper
const validateBookingData = (data) => {
  const errors = [];

  if (!data.instrumentName || data.instrumentName.trim().length === 0) {
    errors.push("Instrument name is required");
  }

  if (!data.experimentTitle || data.experimentTitle.trim().length === 0) {
    errors.push("Experiment title is required");
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters");
  }

  if (!data.preferredDate) {
    errors.push("Preferred date is required");
  } else {
    const prefDate = new Date(data.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (prefDate < today) {
      errors.push("Preferred date cannot be in the past");
    }
  }

  if (!data.durationHours || data.durationHours < 1 || data.durationHours > 24) {
    errors.push("Duration must be between 1 and 24 hours");
  }

  return errors;
};

// Create a new booking
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { instrumentName, experimentTitle, description, preferredDate, durationHours } = req.body;

    // Validate input
    const validationErrors = validateBookingData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Check for duplicate pending bookings
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      instrumentName: instrumentName.trim(),
      preferredDate: new Date(preferredDate),
      status: "Pending",
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already have a pending booking for this instrument on this date",
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      instrumentName: instrumentName.trim(),
      experimentTitle: experimentTitle.trim(),
      description: description.trim(),
      preferredDate: new Date(preferredDate),
      durationHours: Number(durationHours),
    });

    // Populate user details
    await booking.populate("user", "name email");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message,
    });
  }
});

// Get user's bookings with filtering and sorting
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { status, sortBy = "createdAt", order = "desc" } = req.query;

    // Build query
    const query = { user: req.user.id };
    if (status && ["Pending", "Approved", "Rejected"].includes(status)) {
      query.status = status;
    }

    // Build sort object
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    const bookings = await Booking.find(query)
      .sort(sortObj)
      .select("-__v");

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
});

// Get a specific booking by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id, // Ensure user can only access their own bookings
    }).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
});

// Update a booking (only if pending)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be updated",
      });
    }

    // Validate input
    const validationErrors = validateBookingData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Update fields
    const { instrumentName, experimentTitle, description, preferredDate, durationHours } = req.body;

    booking.instrumentName = instrumentName.trim();
    booking.experimentTitle = experimentTitle.trim();
    booking.description = description.trim();
    booking.preferredDate = new Date(preferredDate);
    booking.durationHours = Number(durationHours);

    await booking.save();

    res.json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: error.message,
    });
  }
});

// Delete a booking (only if pending)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending bookings can be deleted",
      });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: error.message,
    });
  }
});

// Get user's booking statistics
router.get("/stats/summary", authenticateToken, async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const summary = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    stats.forEach((stat) => {
      summary.total += stat.count;
      summary[stat._id.toLowerCase()] = stat.count;
    });

    res.json({
      success: true,
      stats: summary,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
});

export default router;