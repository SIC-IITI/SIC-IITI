
// import express from "express";
// import Booking from "../models/bookingSchema.js";
// import { authenticateToken, isAdmin } from "../middlewares/auth.js";

// const router = express.Router();

// // Fetch all bookings (Admin)
// router.get("/", authenticateToken, isAdmin, async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("user", "name email affiliation")
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (error) {
//     console.error("Admin Fetch Error:", error);
//     res.status(500).json({ message: "Error fetching bookings", error: error.message });
//   }
// });

// // Update booking status
// router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const normalizedStatus = status?.toLowerCase();

//     if (!["approved", "rejected"].includes(normalizedStatus)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status: normalizedStatus },
//       { new: true }
//     );

//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     res.json({ message: `Booking ${normalizedStatus} successfully`, booking });
//   } catch (error) {
//     console.error("Admin Update Error:", error);
//     res.status(500).json({ message: "Error updating booking", error: error.message });
//   }
// });

// export default router;
import express from "express";
import Booking from "../models/bookingSchema.js";
import { authenticateToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Get all bookings with filtering, sorting, and pagination (admin only)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const {
      status,
      instrumentName,
      startDate,
      endDate,
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    // Build query
    const query = {};

    if (status && ["Pending", "Approved", "Rejected"].includes(status)) {
      query.status = status;
    }

    if (instrumentName) {
      query.instrumentName = { $regex: instrumentName, $options: "i" };
    }

    if (startDate || endDate) {
      query.preferredDate = {};
      if (startDate) {
        query.preferredDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.preferredDate.$lte = new Date(endDate);
      }
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    // Execute query
    const [bookings, totalCount] = await Promise.all([
      Booking.find(query)
        .populate("user", "name email Affiliation")
        .populate("reviewedBy", "name email")
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .select("-__v"),
      Booking.countDocuments(query),
    ]);

    res.json({
      success: true,
      bookings,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        limit: limitNum,
      },
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: err.message,
    });
  }
});

// Get booking statistics (admin only)
router.get("/stats/overview", authenticateToken, isAdmin, async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalHours: { $sum: "$durationHours" },
        },
      },
    ]);

    const instrumentStats = await Booking.aggregate([
      {
        $group: {
          _id: "$instrumentName",
          bookingCount: { $sum: 1 },
          totalHours: { $sum: "$durationHours" },
        },
      },
      { $sort: { bookingCount: -1 } },
      { $limit: 10 },
    ]);

    const summary = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      totalHours: 0,
    };

    stats.forEach((stat) => {
      summary.total += stat.count;
      summary[stat._id.toLowerCase()] = stat.count;
      summary.totalHours += stat.totalHours;
    });

    res.json({
      success: true,
      summary,
      topInstruments: instrumentStats,
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: err.message,
    });
  }
});

// Get a specific booking by ID (admin only)
router.get("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email Affiliation phone")
      .populate("reviewedBy", "name email");

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
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: err.message,
    });
  }
});

// Approve or reject a booking (admin only)
router.put("/:id/status", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    // Validate status
    if (!status || !["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Approved' or 'Rejected'",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if already processed
    if (booking.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: `Booking has already been ${booking.status.toLowerCase()}`,
      });
    }

    // Update booking status
    booking.status = status;
    booking.reviewedBy = req.user.id;
    booking.reviewedAt = new Date();

    if (adminNotes) {
      booking.adminNotes = adminNotes.trim();
    }

    await booking.save();

    // Populate for response
    await booking.populate("user", "name email");
    await booking.populate("reviewedBy", "name email");

    res.json({
      success: true,
      message: `Booking ${status.toLowerCase()} successfully`,
      booking,
    });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: err.message,
    });
  }
});

// Bulk approve/reject bookings (admin only)
router.put("/bulk/status", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { bookingIds, status, adminNotes } = req.body;

    if (!bookingIds || !Array.isArray(bookingIds) || bookingIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of booking IDs",
      });
    }

    if (!status || !["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Approved' or 'Rejected'",
      });
    }

    const result = await Booking.updateMany(
      {
        _id: { $in: bookingIds },
        status: "Pending",
      },
      {
        $set: {
          status,
          reviewedBy: req.user.id,
          reviewedAt: new Date(),
          ...(adminNotes && { adminNotes }),
        },
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} booking(s) ${status.toLowerCase()} successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Error bulk updating bookings:", err);
    res.status(500).json({
      success: false,
      message: "Error bulk updating bookings",
      error: err.message,
    });
  }
});

// Delete a booking (admin only - use with caution)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting booking",
      error: err.message,
    });
  }
});

// Get upcoming approved bookings (admin calendar view)
router.get("/calendar/upcoming", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(days));
    endDate.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      status: "Approved",
      preferredDate: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate("user", "name email")
      .sort({ preferredDate: 1 })
      .select("instrumentName experimentTitle preferredDate durationHours user");

    res.json({
      success: true,
      count: bookings.length,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      bookings,
    });
  } catch (err) {
    console.error("Error fetching calendar:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching calendar",
      error: err.message,
    });
  }
});

export default router;